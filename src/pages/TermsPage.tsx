import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950">
            Terms & Conditions
          </h1>
          <p className="text-[#717b72] text-xs font-bold uppercase tracking-wider">
            Last Updated: July 3, 2026
          </p>
        </div>

        {/* Content Block */}
        <div className="space-y-8 text-sm md:text-base text-slate-600 leading-relaxed font-medium">
          <p>
            Welcome to Digitalife Ehub. By accessing or using our website, resource library, and programs, you agree to comply with and be bound by the following Terms & Conditions.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">1. Intellectual Property</h2>
            <p>
              All materials provided on this website, including but not limited to strategy reports, SOP templates, checklists, graphics, and cohort curriculum guides, are the intellectual property of Digitalife Ehub. You are granted a limited, personal, non-exclusive license to download and customize templates for your internal business growth, but you may not resell, redistribute, or license these materials to third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">2. Consulting Disclaimer</h2>
            <p>
              Digitalife Ehub provides strategic advisement, operational templates, and training. While we strive to equip you with the best scaling frameworks, we do not guarantee specific financial results, revenue achievements, or market gains. Growth depends on execution, market conditions, and unique business variables.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">3. Community Rules</h2>
            <p>
              When joining our free Slack peer network or participating in cohorts, you agree to engage respectfully. Spamming, self-promotion outside designated areas, harassment, or unauthorized copying of shared peer resources will result in immediate removal from the community platform.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">4. Modifications to Services</h2>
            <p>
              We reserve the right to revise our programs, template details, resources, and these terms at any time. Your continued use of the platform constitutes agreement to the updated conditions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">5. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without giving effect to any principles of conflicts of law.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
