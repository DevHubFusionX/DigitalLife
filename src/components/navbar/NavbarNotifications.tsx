import { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  tag: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: 'New Playbook Released',
    description: 'Standard Operating Procedures (SOP) Template is now available for download.',
    time: '2 hours ago',
    tag: 'Resources',
  },
  {
    id: 2,
    title: 'Operations Cohort Launching',
    description: 'Seat reservations are open for the August Cohort. Applications close soon.',
    time: '1 day ago',
    tag: 'Cohort',
  },
  {
    id: 3,
    title: 'Slack Peer Exchange Live',
    description: 'Join 1,200+ founders discussing strategy and scaling.',
    time: '3 days ago',
    tag: 'Community',
  },
];

interface NavbarNotificationsProps {
  mobileMode?: boolean;
}

export default function NavbarNotifications({ mobileMode = false }: NavbarNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  if (mobileMode) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasUnread(false);
          }}
          className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center cursor-pointer relative border-none"
        >
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900 animate-pulse" />
          )}
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 bottom-14 w-72 bg-white border border-black/10 rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-3">
              <div className="flex justify-between items-center pb-2 border-b border-black/5">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                  Announcements
                </span>
              </div>
              <div className="flex flex-col gap-3 text-left max-h-60 overflow-y-auto">
                {DEFAULT_NOTIFICATIONS.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-1 border-b border-black/5 pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold text-[#3e4095] uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <span className="text-[8px] text-[#717b72] font-semibold">{item.time}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[10px] text-[#717b72] leading-normal font-semibold">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all cursor-pointer relative border-none"
      >
        <Bell className="h-4 w-4" />
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border border-slate-900 animate-pulse" />
        )}
      </motion.button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-80 bg-white border border-black/10 rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-3">
            <div className="flex justify-between items-center pb-2 border-b border-black/5">
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                Updates &amp; Announcements
              </span>
              <button
                type="button"
                onClick={() => setHasUnread(false)}
                className="text-[9px] font-bold text-[#3e4095] hover:underline cursor-pointer border-none bg-transparent"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {DEFAULT_NOTIFICATIONS.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold text-[#3e4095] uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <span className="text-[8px] text-[#717b72] font-semibold">{item.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-[#717b72] leading-normal font-semibold">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
