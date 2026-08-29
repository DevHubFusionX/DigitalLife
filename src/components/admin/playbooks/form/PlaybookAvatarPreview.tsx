interface PlaybookAvatarPreviewProps {
  avatarUrl?: string | null;
  name?: string;
  initials?: string;
  role?: string;
}

export default function PlaybookAvatarPreview({
  avatarUrl,
  name,
  initials,
  role,
}: PlaybookAvatarPreviewProps) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#3e4095] to-[#2e3075] text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0 overflow-hidden">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <span>{initials || 'EX'}</span>
        )}
      </div>
      <div className="grow truncate">
        <h4 className="text-xs font-black text-slate-900 truncate">
          {name || 'Expert Name Preview'}
        </h4>
        <p className="text-[10px] font-semibold text-slate-400 truncate">
          {role || 'Operational Leadership'}
        </p>
      </div>
    </div>
  );
}
