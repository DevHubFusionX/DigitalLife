/**
 * Utility to reliably trigger and handle resource downloads across all browsers,
 * handling Google Drive URLs, Cloudinary attachments, cross-origin restrictions,
 * and fallback starter packages.
 */

export function normalizeResourceDownloadUrl(url?: string | null): string {
  if (!url) return '';
  let clean = url.trim();
  if (clean.toLowerCase().startsWith('wa.me/')) {
    return `https://${clean}`;
  }
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    return `https://${clean}`;
  }

  // Convert Google Drive view URLs to direct export URLs
  const driveMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
  }

  // For Cloudinary uploads, insert fl_attachment only for image/video transformations
  // Raw files (e.g. .docx, .zip, .xlsx under /raw/upload/) do NOT support transformations and return 400
  if (clean.includes('cloudinary.com') && !clean.includes('fl_attachment')) {
    if (clean.includes('/image/upload/')) {
      clean = clean.replace('/image/upload/', '/image/upload/fl_attachment/');
    } else if (clean.includes('/video/upload/')) {
      clean = clean.replace('/video/upload/', '/video/upload/fl_attachment/');
    }
  }

  return clean;
}

export interface DownloadableResource {
  id: string;
  title: string;
  format?: string | null;
  category?: string | null;
  deliverables?: string[] | null;
  outcomes?: string[] | null;
  description?: string | null;
  downloadUrl?: string | null;
  youtubeUrl?: string | null;
}

export async function downloadResourceDocument(
  url: string | null | undefined,
  resource: DownloadableResource
): Promise<void> {
  const cleanTitle = resource.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
  const filename = `${cleanTitle}_digitalife_resource`;

  // If downloadUrl is missing but youtubeUrl contains a Google Drive/Docs file link, use that as fallback
  let effectiveUrl = url;
  if (!effectiveUrl && resource.youtubeUrl) {
    const yt = resource.youtubeUrl.trim();
    if (yt.includes('drive.google.com') || yt.includes('docs.google.com') || yt.includes('cloudinary.com')) {
      effectiveUrl = yt;
    }
  }

  const targetUrl = normalizeResourceDownloadUrl(effectiveUrl);

  // If a valid external, Google Drive, or Cloudinary URL exists:
  if (targetUrl) {
    // If it's a WhatsApp link, open in new tab
    if (targetUrl.includes('wa.me/')) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Strategy 1: Attempt blob fetch for same-origin or CORS-enabled URLs
    try {
      const res = await fetch(targetUrl, { mode: 'cors' });
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
        return;
      }
    } catch {
      // CORS blocked — expected for Google Drive & Cloudinary cross-origin URLs
    }

    // Strategy 2: Direct navigation for URLs that serve Content-Disposition: attachment
    // Google Drive uc?export=download and Cloudinary fl_attachment both handle this server-side
    const isGoogleDrive = targetUrl.includes('drive.google.com');
    const isCloudinaryAttachment = targetUrl.includes('cloudinary.com') && targetUrl.includes('fl_attachment');
    const isDirectDownload = isGoogleDrive || isCloudinaryAttachment;

    if (isDirectDownload) {
      // Use a hidden iframe to trigger the download without navigating away from the page
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = targetUrl;
      document.body.appendChild(iframe);
      // Clean up after a reasonable delay for the download to initiate
      setTimeout(() => {
        try { document.body.removeChild(iframe); } catch { /* already removed */ }
      }, 10000);
      return;
    }

    // Strategy 3: Fallback — open in new tab for any other URL
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // Fallback: If no custom file was uploaded yet, generate a branded Digitalife Document Package
  const content = `# DIGITALIFE EHUB — RESOURCE PACKAGE
Title: ${resource.title}
Category: ${resource.category || 'General'}
Format: ${resource.format || 'Guide'}
Date: ${new Date().toLocaleDateString()}

==================================================
DESCRIPTION
==================================================
${resource.description || 'Comprehensive standard operating procedures and growth frameworks structured for MSMEs.'}

==================================================
DELIVERABLES INCLUDED
==================================================
${(resource.deliverables || ['Framework Overview', 'Standard Operating Procedures', 'Execution Worksheet']).map((d, i) => `${i + 1}. ${d}`).join('\n')}

==================================================
TARGET OUTCOMES
==================================================
${(resource.outcomes || ['Optimize team efficiency', 'Standardize operational workflows', 'Accelerate business scalability']).map((o) => `• ${o}`).join('\n')}

==================================================
SUPPORT & ACCESS
==================================================
Website: https://digitalifehub.com
Email: hello@digitalifehub.com
WhatsApp Community: https://wa.me/234908331989

© ${new Date().getFullYear()} Digitalife Ehub. All rights reserved.
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `${filename}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
}
