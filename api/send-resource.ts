export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { email, name, resourceId, resourceTitle: reqTitle, downloadUrl: reqUrl } = body;

  if (!email || !resourceId) {
    return new Response(JSON.stringify({ error: 'Missing email or resourceId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured in environment variables.');
    return new Response(JSON.stringify({ error: 'Mail service API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Resolve title and download URL (try Firestore REST API first, fallback to request body)
  let title = reqTitle || 'Your Requested Resource';
  let downloadUrl = reqUrl || '';

  if (projectId) {
    try {
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/resources/${resourceId}`;
      const firestoreRes = await fetch(firestoreUrl);
      if (firestoreRes.ok) {
        const docData = await firestoreRes.json();
        if (docData && docData.fields) {
          title = docData.fields.title?.stringValue || title;
          downloadUrl = docData.fields.downloadUrl?.stringValue || downloadUrl;
          console.log(`Successfully fetched resource detail from Firestore REST: ${title}`);
        }
      } else {
        console.warn(`Firestore REST API returned status ${firestoreRes.status} for resource ${resourceId}. Using request defaults.`);
      }
    } catch (fsErr) {
      console.warn('Failed to query Firestore REST API:', fsErr);
    }
  }

  try {
    const fromEmail = process.env.EMAIL_SENDER || 'Digitalife <onboarding@resend.dev>';
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid rgba(0,0,0,0.05); border-radius: 24px; background-color: #fffdf5; color: #0f172a;">
        <div style="margin-bottom: 24px;">
          <span style="font-size: 10px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #3e4095; display: block; margin-bottom: 4px;">DIGITALIFE</span>
          <h2 style="font-size: 20px; font-weight: 800; tracking: -0.025em; color: #0f172a; margin: 0;">Your Requested Resource is Ready!</h2>
        </div>
        <p style="font-size: 14px; font-weight: 600; color: #334155; line-height: 1.6; margin: 0 0 16px 0;">Hi ${name},</p>
        <p style="font-size: 14px; font-weight: 500; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
          Thank you for your interest in our premium business templates. We are excited to help you scale and structure your enterprise. You can access your copy of <strong>${title}</strong> by clicking the button below:
        </p>
        <div style="margin: 32px 0; text-align: center;">
          <a href="${downloadUrl || '#'}" target="_blank" rel="noopener noreferrer" style="background-color: #ffd148; color: #0f172a; padding: 14px 28px; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; border-radius: 9999px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);">
            Download Resource
          </a>
        </div>
        <p style="font-size: 13px; font-weight: 500; color: #64748b; line-height: 1.6; margin: 24px 0 0 0;">
          If the button above does not work, copy and paste this link into your browser: <br />
          <a href="${downloadUrl || '#'}" target="_blank" rel="noopener noreferrer" style="color: #3e4095; text-decoration: underline; word-break: break-all;">${downloadUrl || '#'}</a>
        </p>
        <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.06); margin: 32px 0;" />
        <p style="font-size: 11px; font-weight: 600; color: #64748b; line-height: 1.6; margin: 0;">
          Need support? Reach out to our team instantly on WhatsApp or call our support line at <a href="tel:09083731989" style="color: #0f172a; font-weight: 700; text-decoration: none;">09083731989</a>.
        </p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `Your Copy of ${title}`,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend API call failed:', errText);
      return new Response(JSON.stringify({ error: 'Failed to send email via Resend' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await resendRes.json();
    return new Response(JSON.stringify({ success: true, messageId: data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
