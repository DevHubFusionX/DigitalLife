import { Plus, Minus } from 'lucide-react';

interface ResourceListFieldsProps {
  deliverables?: string[];
  outcomes?: string[];
  onAddDeliverable: () => void;
  onRemoveDeliverable: (idx: number) => void;
  onUpdateDeliverable: (idx: number, val: string) => void;
  onAddOutcome: () => void;
  onRemoveOutcome: (idx: number) => void;
  onUpdateOutcome: (idx: number, val: string) => void;
  inputCls: string;
  labelCls: string;
}

export default function ResourceListFields({
  deliverables,
  outcomes,
  onAddDeliverable,
  onRemoveDeliverable,
  onUpdateDeliverable,
  onAddOutcome,
  onRemoveOutcome,
  onUpdateOutcome,
  inputCls,
  labelCls,
}: ResourceListFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Deliverables */}
      <div>
        <label className={labelCls}>What's Included (Deliverables)</label>
        <div className="space-y-2">
          {(deliverables ?? []).map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => onUpdateDeliverable(idx, e.target.value)}
                placeholder={`Deliverable ${idx + 1}`}
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => onRemoveDeliverable(idx)}
                className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors cursor-pointer border-none"
              >
                <Minus className="w-3.5 h-3.5 text-rose-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddDeliverable}
            className="flex items-center gap-1.5 text-[11px] font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors cursor-pointer border-none bg-transparent"
          >
            <Plus className="w-3.5 h-3.5" /> Add deliverable item
          </button>
        </div>
      </div>

      {/* Outcomes */}
      <div>
        <label className={labelCls}>Target Outcomes &amp; Strategic Benefits</label>
        <div className="space-y-2">
          {(outcomes ?? []).map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => onUpdateOutcome(idx, e.target.value)}
                placeholder={`Outcome ${idx + 1}`}
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => onRemoveOutcome(idx)}
                className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors cursor-pointer border-none"
              >
                <Minus className="w-3.5 h-3.5 text-rose-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddOutcome}
            className="flex items-center gap-1.5 text-[11px] font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors cursor-pointer border-none bg-transparent"
          >
            <Plus className="w-3.5 h-3.5" /> Add outcome benefit
          </button>
        </div>
      </div>
    </div>
  );
}
