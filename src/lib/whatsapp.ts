/**
 * Centralized WhatsApp config and utility functions.
 * Single source of truth for contact details across the site.
 */

export const WHATSAPP_PHONE = '2349083731989';
export const CONTACT_EMAIL = 'Digitaligehub@gmail.com';
export const CONTACT_ADDRESS = 'Okpu umuobo, Aba, Abia state, Nigeria';
export const CONTACT_PHONE = '09083731989';
export const SELAR_CLARITY_CALL_URL = 'http://selar.com/71g17u467o';

/** Pre-filled WhatsApp message templates */
export const WA_MESSAGES = {
  default: 'Hi Digitalife Ehub, I am interested in scaling and structuring my business.',
  bookDemo: 'Hi Digitalife Ehub, I would like to book a demo to learn how you can help my business grow.',
  growthConsultation: 'Hi Digitalife Ehub, I would like to book a free growth consultation.',
  strategySession: 'Hi Digitalife Ehub, I would like to book a strategy session to discuss my business growth.',
  speakWithTeam: 'Hi Digitalife Ehub, I would love to speak with your team about structuring my business.',
  getStarted: 'Hi Digitalife Ehub, I am ready to get started on my growth journey. Let us discuss!',
  joinCommunity: 'Hi Digitalife Ehub, I would like to join the Visibility Clan community and grow with other founders.',
  claimConsultation: 'Hi Digitalife Ehub, I would like to claim my free consultation and learn more about your services.',
  claritySession: 'Hi Digitalife Ehub, I would like to book my free Growth Clarity Session.',
} as const;

/**
 * Generate a WhatsApp chat URL with a pre-filled message.
 * Opens wa.me in a new tab with the given (or default) message.
 */
export function getWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message || WA_MESSAGES.default);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

/**
 * Open WhatsApp chat in a new tab.
 * Convenience wrapper around getWhatsAppUrl for onClick handlers.
 */
export function openWhatsApp(message?: string): void {
  window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}
