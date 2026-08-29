import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Playbook } from '../../types/playbook';

interface PlaybooksSectionProps {
  playbooks: Playbook[];
}

export default function PlaybooksSection({ playbooks }: PlaybooksSectionProps) {
  return (
    <section className="py-20 bg-slate-900/1 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-3">Expert Playbooks</h2>
          <p className="text-slate-500 text-sm font-semibold max-w-xl mx-auto">
            Read actionable strategies co-authored with certified practitioners.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {playbooks.map((p) => (
            <div
              key={p.id}
              className="bg-[#fffdf5] border border-black/5 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {p.avatarUrl ? (
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-900/5"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-900/5">
                      {p.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">{p.name}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {p.role}
                    </span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">{p.description}</p>
              </div>
              <Link
                to={p.linkedResourceId ? `/resources/${p.linkedResourceId}` : '/resources'}
                className="flex items-center justify-between text-xs font-bold text-slate-950 hover:text-[#3e4095] border-t border-black/5 pt-4 mt-2 transition-colors no-underline"
              >
                <span>{p.linkedResourceLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
          {playbooks.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 font-bold text-sm">
              No expert playbooks available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
