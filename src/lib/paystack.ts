/**
 * Helper to dynamically load the Paystack Inline SDK.
 */
export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).PaystackPop) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // in kobo
  currency?: string;
  ref: string;
  onSuccess: (response: { reference: string; status: string }) => void;
  onCancel: () => void;
}

/**
 * Initiates checkout via Paystack Popups.
 */
export async function payWithPaystack(options: PaystackOptions): Promise<void> {
  const loaded = await loadPaystackScript();
  if (!loaded) {
    throw new Error('Failed to load Paystack payment SDK. Check your internet connection.');
  }

  const handler = (window as any).PaystackPop.setup({
    key: options.key,
    email: options.email,
    amount: options.amount,
    currency: options.currency || 'NGN',
    ref: options.ref,
    callback: (response: any) => {
      // payment successful: response.reference
      options.onSuccess(response);
    },
    onClose: () => {
      options.onCancel();
    },
  });

  handler.openIframe();
}
