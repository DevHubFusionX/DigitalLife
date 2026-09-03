export const config = {
  runtime: 'edge',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export default async function handler(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: CORS_HEADERS,
    });
  }

  let body: {
    email?: string;
    name?: string;
    phone?: string;
    resourceId?: string;
    resourceTitle?: string;
    downloadUrl?: string;
    isTest?: boolean;
    subject?: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const {
    email,
    name = 'Customer',
    phone = '',
    resourceId,
    resourceTitle: reqTitle,
    downloadUrl: reqUrl,
    isTest = false,
    subject: customSubject,
  } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: 'Missing recipient email address' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  if (!isTest && !resourceId && !reqTitle) {
    return new Response(JSON.stringify({ error: 'Missing resource identification' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured in environment variables.');
    return new Response(JSON.stringify({
      error: 'Resend API key is not configured in environment variables.',
      code: 'MISSING_API_KEY'
    }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }

  // Resolve title and download URL (try Firestore REST API first if resourceId exists, fallback to request body)
  let title = reqTitle || 'Digitalife Business Resource';
  let downloadUrl = reqUrl || '';

  if (resourceId && resourceId !== 'test-resource' && projectId && !reqUrl) {
    try {
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/resources/${resourceId}`;
      const firestoreRes = await fetch(firestoreUrl);
      if (firestoreRes.ok) {
        const docData = await firestoreRes.json();
        if (docData && docData.fields) {
          title = docData.fields.title?.stringValue || title;
          downloadUrl = docData.fields.downloadUrl?.stringValue || downloadUrl;
        }
      }
    } catch (fsErr) {
      console.warn('Firestore REST API lookup skipped:', fsErr);
    }
  }

  function normalizeDownloadUrl(url?: string | null, resId?: string): string {
    if (url) {
      const clean = url.trim();
      if (clean.toLowerCase().startsWith('wa.me/')) {
        return `https://${clean}`;
      }
      if (clean.startsWith('http://') || clean.startsWith('https://')) {
        return clean;
      }
      if (clean.length > 0 && !clean.startsWith('#')) {
        return `https://${clean}`;
      }
    }
    if (resId && resId !== 'test-resource') {
      return `https://digitalifehub.com/resources/${resId}`;
    }
    return 'https://digitalifehub.com/resources';
  }

  const validDownloadUrl = normalizeDownloadUrl(downloadUrl, resourceId);

  try {
    const fromEmail = process.env.EMAIL_SENDER || 'Digitalife <hello@digitalifehub.com>';
    const emailSubject = isTest
      ? (customSubject || '🧪 Digitalife Email Gateway Test')
      : (customSubject || `Your Copy of ${title} — Digitalife Ehub`);

    let emailHtml = '';

    if (isTest) {
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 36px 28px; border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; background-color: #fffdf5; color: #0f172a;">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 10px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #3e4095; display: block; margin-bottom: 6px;">DIGITALIFE SYSTEMS</span>
            <h2 style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #0f172a; margin: 0;">Resend Gateway Diagnostic Test</h2>
          </div>
          <p style="font-size: 14px; font-weight: 600; color: #334155; line-height: 1.6; margin: 0 0 16px 0;">Hello Admin,</p>
          <p style="font-size: 14px; font-weight: 500; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
            This is a verified test email dispatched from your Digitalife application via the <strong>Resend Email API</strong>. If you are reading this, your API credentials and transactional email pipeline are operating correctly!
          </p>
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin: 24px 0;">
            <p style="font-size: 12px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">Dispatch Diagnostics:</p>
            <p style="font-size: 13px; font-family: monospace; color: #64748b; margin: 4px 0;"><strong>Sender:</strong> ${fromEmail}</p>
            <p style="font-size: 13px; font-family: monospace; color: #64748b; margin: 4px 0;"><strong>Recipient:</strong> ${email}</p>
            <p style="font-size: 13px; font-family: monospace; color: #64748b; margin: 4px 0;"><strong>Domain Status:</strong> Verified (digitalifehub.com)</p>
            <p style="font-size: 13px; font-family: monospace; color: #64748b; margin: 4px 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          <div style="margin: 24px 0; text-align: center;">
            <a href="https://digitalifehub.com" target="_blank" rel="noopener noreferrer" style="background-color: #3e4095; color: #ffffff; padding: 12px 28px; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; border-radius: 9999px; display: inline-block;">
              Visit Digitalife Platform
            </a>
          </div>
        </div>
      `;
    } else {
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 36px 28px; border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; background-color: #fffdf5; color: #0f172a;">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 10px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #3e4095; display: block; margin-bottom: 6px;">DIGITALIFE EHUB</span>
            <h2 style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #0f172a; margin: 0;">Your Requested Resource is Ready!</h2>
          </div>
          <p style="font-size: 14px; font-weight: 600; color: #334155; line-height: 1.6; margin: 0 0 16px 0;">Hi ${name},</p>
          <p style="font-size: 14px; font-weight: 500; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
            Thank you for unlocking <strong>${title}</strong>. We are thrilled to support your business journey with actionable frameworks and systems. Click the button below to download your resource:
          </p>${phone ? `
          <p style="font-size: 12px; font-weight: 500; color: #64748b; line-height: 1.6; margin: 0 0 16px 0;">
            📱 Phone on file: <strong>${phone}</strong>
          </p>` : ''}
          <div style="margin: 32px 0; text-align: center;">
            <a href="${validDownloadUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #ffd148; color: #0f172a; padding: 14px 32px; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; border-radius: 9999px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);">
              Download Resource Now
            </a>
          </div>
          <p style="font-size: 12px; font-weight: 500; color: #64748b; line-height: 1.6; margin: 24px 0 0 0;">
            If the download button does not open automatically, copy and paste this link into your browser:<br />
            <a href="${validDownloadUrl}" target="_blank" rel="noopener noreferrer" style="color: #3e4095; text-decoration: underline; word-break: break-all;">${validDownloadUrl}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.06); margin: 32px 0;" />
          <div style="background-color: rgba(62, 64, 149, 0.04); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: 700; color: #3e4095; margin: 0 0 4px 0;">Need personalized guidance or custom business automation?</p>
            <p style="font-size: 12px; color: #475569; margin: 0;">
              Chat with our advisory team directly on WhatsApp or call <a href="tel:09083731989" style="color: #0f172a; font-weight: 700; text-decoration: none;">09083731989</a>.
            </p>
          </div>
          <p style="font-size: 11px; font-weight: 600; color: #94a3b8; text-align: center; margin: 0;">
            © ${new Date().getFullYear()} Digitalife Ehub. All rights reserved.
          </p>
        </div>
      `;
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      let errDetail: { message?: string; name?: string; statusCode?: number } = {};
      try {
        errDetail = await resendRes.json();
      } catch {
        const raw = await resendRes.text();
        errDetail = { message: raw };
      }

      console.error('Resend API call rejected:', errDetail);

      let userFriendlyMessage = errDetail.message || 'Failed to send email via Resend';
      if (errDetail.name === 'restricted_api_key' || (errDetail.message && errDetail.message.includes('restricted'))) {
        userFriendlyMessage = 'Resend API key is restricted. Ensure your key has Sending permissions.';
      } else if (errDetail.message && errDetail.message.includes('can only send testing emails to your own email address')) {
        userFriendlyMessage = `Resend Testing restriction: With onboarding@resend.dev, emails can only be sent to the email address registered on your Resend account. To send to all users, verify a custom domain at resend.com/domains. (Resend: ${errDetail.message})`;
      }

      return new Response(JSON.stringify({
        error: userFriendlyMessage,
        details: errDetail,
        status: resendRes.status,
      }), {
        status: resendRes.status >= 400 && resendRes.status < 500 ? resendRes.status : 502,
        headers: CORS_HEADERS,
      });
    }

    const data = await resendRes.json();
    return new Response(JSON.stringify({
      success: true,
      messageId: data.id,
      recipient: email,
    }), {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    const errMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: errMessage }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}
