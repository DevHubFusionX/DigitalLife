import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResources } from '../hooks/useResources';
import { usePageSEO } from '../hooks/usePageSEO';
import { addLead } from '../lib/firestore/leads';
import { payWithPaystack } from '../lib/paystack';
import { useToast } from '../hooks/useToast';
import { downloadResourceDocument } from '../lib/download';
import { sendResourceDeliveryEmail } from '../lib/email';

import ResourceHero from '../components/resource-detail/ResourceHero';
import ResourceDetails from '../components/resource-detail/ResourceDetails';
import ResourceAccessCard from '../components/resource-detail/ResourceAccessCard';
import ResourceVideoTutorial from '../components/resource-detail/ResourceVideoTutorial';
import RelatedResources from '../components/resource-detail/RelatedResources';

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { resources, loading } = useResources();
  const { success, error: toastError, info } = useToast();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [shareOpen, setShareOpen] = useState(false);

  const resource = resources.find((r) => r.id === id) ?? resources[0];

  usePageSEO({
    title: resource ? `${resource.title} | Digitalife Resource Library` : 'Resource Library | Digitalife Ehub',
    description: resource?.description,
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Resource link copied to clipboard!');
    setShareOpen(false);
  };

  const handleDownload = () => {
    if (!resource) return;
    downloadResourceDocument(resource.downloadUrl, resource);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !resource) return;
    setIsLoading(true);

    try {
      // 1. Trigger the direct document download to the user's device immediately
      await downloadResourceDocument(resource.downloadUrl, resource);

      // 2. Save lead record in Firestore CRM
      await addLead({
        name: name.trim(),
        email: email.trim(),
        resourceId: resource.id,
        resourceTitle: resource.title,
      });

      // 3. Dispatch document link copy directly to the user's email via Resend
      await sendResourceDeliveryEmail({
        name: name.trim(),
        email: email.trim(),
        resourceId: resource.id,
        resourceTitle: resource.title,
        downloadUrl: resource.downloadUrl,
      });

      success(`Resource unlocked! Downloading now & link sent to ${email}.`, 'Download Ready');
    } catch (err) {
      console.warn('Unlock process notification:', err);
    } finally {
      setIsLoading(false);
      setFormSubmitted(true);
    }
  };

  const handlePaidUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !resource) return;
    setIsLoading(true);

    try {
      const priceInNGN = Number(resource.price) || 0;
      const amountInKobo = Math.round(priceInNGN * 100);
      const ref = `DIG_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

      if (!paystackKey) {
        throw new Error('Paystack public key is not configured. Please use offline WhatsApp checkout.');
      }

      const nameParts = name.trim().split(' ');
      const firstname = nameParts[0] || 'Customer';
      const lastname = nameParts.slice(1).join(' ') || undefined;

      await payWithPaystack({
        key: paystackKey,
        email: email.trim(),
        amount: amountInKobo,
        currency: 'NGN',
        ref,
        firstname,
        lastname,
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: name.trim(),
            },
            {
              display_name: 'Resource Title',
              variable_name: 'resource_title',
              value: resource.title,
            },
            {
              display_name: 'Resource ID',
              variable_name: 'resource_id',
              value: resource.id,
            },
            {
              display_name: 'Platform',
              variable_name: 'platform',
              value: 'Digitalife Ehub',
            },
          ],
        },
        onSuccess: async (response) => {
          try {
            await addLead({
              name: name.trim(),
              email: email.trim(),
              resourceId: resource.id,
              resourceTitle: resource.title,
              isPaid: true,
              amountPaid: priceInNGN,
              paymentRef: response.reference,
            });
          } catch (err) {
            console.warn('Failed to save payment lead to Firestore:', err);
          }

          try {
            await sendResourceDeliveryEmail({
              name: name.trim(),
              email: email.trim(),
              resourceId: resource.id,
              resourceTitle: resource.title,
              downloadUrl: resource.downloadUrl,
            });
          } catch (emailErr) {
            console.warn('Failed to send fulfillment email:', emailErr);
          }

          setFormSubmitted(true);
          setIsLoading(false);
          success('Payment approved! Download starting and email copy dispatched.', 'Payment Successful');
          downloadResourceDocument(resource.downloadUrl, resource);
        },
        onCancel: () => {
          setIsLoading(false);
          info('Payment checkout was closed.');
        },
      });
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : 'Payment initiation failed.';
      toastError(msg);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-[#3e4095] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-slate-500 font-bold">Resource not found.</p>
        <Link to="/resources" className="text-[#3e4095] font-bold text-sm hover:underline">
          ← Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-20 pb-24">
      {/* 1. Breadcrumb + Hero */}
      <ResourceHero
        resource={resource}
        onGetAccessClick={() => {
          document.getElementById('access-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        shareOpen={shareOpen}
        setShareOpen={setShareOpen}
        onCopyLink={handleCopyLink}
      />

      {/* 2. Main Content & Sidebar Grid */}
      <section className="bg-[#fffdf5] py-16 md:py-20 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ResourceDetails deliverables={resource.deliverables} outcomes={resource.outcomes} />
          <ResourceAccessCard
            resource={resource}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            formSubmitted={formSubmitted}
            onUnlock={handleUnlock}
            onPaidUnlock={handlePaidUnlock}
            onDownload={handleDownload}
          />
        </div>
      </section>

      {/* 3. YouTube Tutorial Video Embed */}
      <ResourceVideoTutorial youtubeUrl={resource.youtubeUrl} title={resource.title} />

      {/* 4. Related Resources Carousel */}
      <RelatedResources
        currentResourceId={resource.id}
        category={resource.category}
        resources={resources}
      />
    </div>
  );
}
