export interface SendResourceEmailParams {
  name: string;
  email: string;
  resourceId: string;
  resourceTitle: string;
  downloadUrl?: string | null;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  recipient?: string;
  error?: string;
}

/**
 * Dispatches resource download & fulfillment email via Resend email service.
 */
export async function sendResourceDeliveryEmail(
  params: SendResourceEmailParams
): Promise<EmailResponse> {
  try {
    const res = await fetch('/api/send-resource', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: params.name.trim(),
        email: params.email.trim(),
        resourceId: params.resourceId,
        resourceTitle: params.resourceTitle,
        downloadUrl: params.downloadUrl || '',
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return {
        success: true,
        messageId: data.messageId,
        recipient: data.recipient || params.email,
      };
    }

    return {
      success: false,
      error: data.error || `Server responded with HTTP ${res.status}`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network communication error';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Sends a diagnostic verification email via Resend to verify deliverability.
 */
export async function sendTestEmail(targetEmail: string): Promise<EmailResponse> {
  try {
    const res = await fetch('/api/send-resource', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Digitalife Administrator',
        email: targetEmail.trim(),
        isTest: true,
        subject: '🧪 Digitalife Resend Email Gateway Test',
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return {
        success: true,
        messageId: data.messageId,
        recipient: data.recipient || targetEmail,
      };
    }

    return {
      success: false,
      error: data.error || `Server responded with HTTP ${res.status}`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network communication error';
    return {
      success: false,
      error: message,
    };
  }
}
