import { Plus, Trash2 } from 'lucide-react';

interface BlogSectionsEditorProps {
  introduction: string;
  setIntroduction: (val: string) => void;
  keyTakeaway: string;
  setKeyTakeaway: (val: string) => void;
  sections: { heading: string; content: string }[];
  onSectionChange: (idx: number, field: 'heading' | 'content', value: string) => void;
  onAddSection: () => void;
  onRemoveSection: (idx: number) => void;
  inputCls: string;
  labelCls: string;
}

export default function BlogSectionsEditor({
  introduction,
  setIntroduction,
  keyTakeaway,
  setKeyTakeaway,
  sections,
  onSectionChange,
  onAddSection,
  onRemoveSection,
  inputCls,
  labelCls,
}: BlogSectionsEditorProps) {
  return (
    <div className="space-y-5">
      {/* Introduction */}
      <div>
        <label className={labelCls}>Introduction Paragraph *</label>
        <textarea
          required
          rows={4}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Opening paragraph(s) setting the premise of the article..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Dynamic Sections */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelCls}>Article Sections</label>
          <button
            type="button"
            onClick={onAddSection}
            className="flex items-center gap-1 text-[10px] font-black text-[#3e4095] hover:text-[#2e3075] transition-colors cursor-pointer border-none bg-transparent"
          >
            <Plus className="w-3 h-3" /> Add Section
          </button>
        </div>
        <div className="space-y-4">
          {sections.map((sec, idx) => (
            <div key={idx} className="border border-black/8 rounded-2xl p-4 bg-slate-50 space-y-3 relative">
              <button
                type="button"
                onClick={() => onRemoveSection(idx)}
                disabled={sections.length === 1}
                className="absolute top-3 right-3 w-6 h-6 rounded-md bg-white hover:bg-rose-50 flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer border-none"
                title="Remove section"
              >
                <Trash2 className="w-3 h-3 text-rose-500" />
              </button>
              <div>
                <label className={labelCls}>Section {idx + 1} Heading</label>
                <input
                  value={sec.heading}
                  onChange={(e) => onSectionChange(idx, 'heading', e.target.value)}
                  placeholder="Section title"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Section Body</label>
                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => onSectionChange(idx, 'content', e.target.value)}
                  placeholder="Write paragraphs. Separate distinct paragraphs with a blank line."
                  className={`${inputCls} resize-none`}
                />
                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  Use double-Enter to separate paragraphs.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Takeaway */}
      <div>
        <label className={labelCls}>Key Takeaway Box *</label>
        <textarea
          required
          rows={2}
          value={keyTakeaway}
          onChange={(e) => setKeyTakeaway(e.target.value)}
          placeholder="The single most memorable takeaway from this piece..."
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}
