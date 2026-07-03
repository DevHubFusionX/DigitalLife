import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Header Block */}
        <div className="border-b border-black/5 pb-8 mb-10 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#3e4095]/5 flex items-center justify-center text-[#3e4095]">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950">
            Privacy Policy
          </h1>
          <p className="text-[#717b72] text-xs font-bold uppercase tracking-wider">
            Last Updated: July 3, 2026
          </p>
        </div>

        {/* Content Block */}
        <div className="space-y-8 text-sm md:text-base text-slate-600 leading-relaxed font-medium">
          <p>
            At Digitalife Ehub, we are committed to maintaining the trust and confidence of our clients and website visitors. This Privacy Policy details how we collect, protect, and use your personal information when you engage with our services, resources, and website.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">1. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when booking growth consultations, requesting resources, or joining our Slack community. This information typically includes your name, corporate email address, phone number, company stage, and operational challenges.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To schedule and customize your Growth Clarity Sessions.</li>
              <li>To deliver the digital tools, playbooks, and templates you request.</li>
              <li>To invite you to peer network channels and live cohorts.</li>
              <li>To periodically share strategic tips and firm announcements (you may opt out at any time).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, rent, or trade your personal information with third parties. Your information is accessed solely by our strategy partners and team members to deliver services. We may utilize secure, third-party hosting, messaging, and scheduling software to run our programs.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">4. Data Security</h2>
            <p>
              We enforce appropriate physical, technological, and administrative safeguards to protect your personal details from unauthorized access, modification, or exposure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">5. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding your personal information, please feel free to reach out to us at{' '}
              <a href="mailto:info@digitalifeehub.com" className="text-[#3e4095] font-bold underline">
                info@digitalifeehub.com
              </a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
