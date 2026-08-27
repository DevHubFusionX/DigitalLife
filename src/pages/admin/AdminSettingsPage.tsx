import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useResources } from '../../hooks/useResources';
import { useVideos } from '../../hooks/useVideos';
import { useBlog } from '../../hooks/useBlog';
import { useLeads } from '../../hooks/useLeads';
import { usePlaybooks } from '../../hooks/usePlaybooks';
import { useMetadata } from '../../hooks/useMetadata';

import IntegrationHealthCard from '../../components/admin/settings/IntegrationHealthCard';
import EmailTestCard from '../../components/admin/settings/EmailTestCard';
import MetadataSettingsCard from '../../components/admin/settings/MetadataSettingsCard';
import SecuritySettingsCard from '../../components/admin/settings/SecuritySettingsCard';
import BackupSettingsCard from '../../components/admin/settings/BackupSettingsCard';

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const { resources } = useResources();
  const { videos } = useVideos();
  const { posts } = useBlog();
  const { leads } = useLeads();
  const { playbooks } = usePlaybooks();
  const { categories, formats, loading: metaLoading } = useMetadata();

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 font-sans select-none">
      {/* 1. Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          System Settings &amp; Diagnostics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
          Manage cloud integrations, email dispatchers, content taxonomy, administrative security, and database backups.
        </p>
      </div>

      {/* 2. Integration Health & API Diagnostics */}
      <IntegrationHealthCard />

      {/* 3. Transactional Email Delivery Tester */}
      <EmailTestCard defaultEmail={user?.email || ''} />

      {/* 4. Taxonomy & Metadata Manager (Categories & Deliverable Formats) */}
      <MetadataSettingsCard
        categories={categories}
        formats={formats}
        loading={metaLoading}
      />

      {/* 5. Administrative Authentication & Password Management */}
      <SecuritySettingsCard user={user} />

      {/* 6. Comprehensive JSON Database Backups (Seed buttons removed) */}
      <BackupSettingsCard
        resources={resources}
        videos={videos}
        posts={posts}
        leads={leads}
        playbooks={playbooks}
        categories={categories}
        formats={formats}
      />
    </div>
  );
}
