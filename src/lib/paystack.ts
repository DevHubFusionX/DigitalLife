/**
 * Paystack Inline Checkout Helper & Types for Digitalife Ehub.
 */

export interface PaystackCustomField {
  display_name: string;
  variable_name: string;
  value: string;
}

export interface PaystackMetadata {
  custom_fields?: PaystackCustomField[];
  [key: string]: unknown;
}

export interface PaystackSuccessResponse {
  reference: string;
  status?: string;
  trans?: string;
  transaction?: string;
  message?: string;
  [key: string]: unknown;
}

export interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // in kobo (NGN) or lowest currency unit
  currency?: string;
  ref: string;
  firstname?: string;
  lastname?: string;
  metadata?: PaystackMetadata;
  channels?: ('card' | 'bank' | 'ussd' | 'qr' | 'mobile_money' | 'bank_transfer')[];
  onSuccess: (response: PaystackSuccessResponse) => void;
  onCancel: () => void;
}

/**
 * Helper to dynamically load the Paystack Inline SDK.
 */
export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ((window as unknown as { PaystackPop?: unknown }).PaystackPop) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector('script[src*="paystack.co"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
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

/**
 * Initiates checkout via Paystack Popup iframe.
 */
export async function payWithPaystack(options: PaystackOptions): Promise<void> {
  if (!options.key || !options.key.trim()) {
    throw new Error('Paystack public key is missing or not configured.');
  }

  const loaded = await loadPaystackScript();
  if (!loaded) {
    throw new Error('Failed to load the Paystack payment gateway. Please check your internet connection and try again.');
  }

  const paystackPop = (window as unknown as { PaystackPop?: { setup: (config: unknown) => { openIframe: () => void } } }).PaystackPop;

  if (!paystackPop || typeof paystackPop.setup !== 'function') {
    throw new Error('Paystack checkout initialization failed. Please refresh and try again.');
  }

  const config: Record<string, unknown> = {
    key: options.key.trim(),
    email: options.email.trim(),
    amount: options.amount,
    currency: options.currency || 'NGN',
    ref: options.ref,
    callback: (response: PaystackSuccessResponse) => {
      options.onSuccess(response);
    },
    onClose: () => {
      options.onCancel();
    },
  };

  if (options.firstname) config.firstname = options.firstname;
  if (options.lastname) config.lastname = options.lastname;
  if (options.metadata) config.metadata = options.metadata;
  if (options.channels && options.channels.length > 0) config.channels = options.channels;

  const handler = paystackPop.setup(config);
  handler.openIframe();
}
