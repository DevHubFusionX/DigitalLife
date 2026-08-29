import { useRef, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { uploadResourceFile } from '../../../../lib/cloudinary';
import { useToast } from '../../../../hooks/useToast';

interface ResourceFileUploadProps {
  downloadUrl?: string | null;
  fileSize?: string | null;
  onDownloadUrlChange: (url: string) => void;
  onFileSizeChange: (size: string) => void;
  inputCls: string;
  labelCls: string;
}

export default function ResourceFileUpload({
  downloadUrl,
  fileSize,
  onDownloadUrlChange,
  onFileSizeChange,
  inputCls,
  labelCls,
}: ResourceFileUploadProps) {
  const { success, error: toastError } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError(null);
    setFileUploading(true);
    setFileProgress(0);

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const extension = file.name.split('.').pop()?.toUpperCase() || 'FILE';

    try {
      const url = await uploadResourceFile(file, setFileProgress);
      onDownloadUrlChange(url);
      if (!fileSize) {
        onFileSizeChange(`${sizeInMb} MB (${extension})`);
      }
      success(`Resource file "${file.name}" uploaded successfully.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'File upload failed.';
      setFileError(msg);
      toastError(msg);
    } finally {
      setFileUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* File Upload Section */}
      <div className="space-y-2">
        <label className={labelCls}>Resource File Attachment (PDF, DOCX, ZIP, etc.)</label>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={downloadUrl || ''}
            onChange={(e) => onDownloadUrlChange(e.target.value)}
            placeholder="Paste direct download URL or upload via Cloudinary..."
            className="grow bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-400"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.zip,.xlsx,.xls,.pptx,.ppt,.txt,.csv"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            disabled={fileUploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5 cursor-pointer border-none shadow-xs"
          >
            {fileUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {fileProgress}% Uploading...
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                Upload File
              </>
            )}
          </button>
        </div>
        {fileError && <p className="text-[10px] font-bold text-rose-500 mt-1">{fileError}</p>}
      </div>

      {/* File Size */}
      <div>
        <label className={labelCls}>File Size / Format Label (optional)</label>
        <input
          type="text"
          value={fileSize ?? ''}
          onChange={(e) => onFileSizeChange(e.target.value)}
          placeholder="e.g. 4.8 MB (PDF)"
          className={inputCls}
        />
      </div>
    </div>
  );
}
