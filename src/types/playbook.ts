export interface Playbook {
  id: string;
  /** Display initials shown in the avatar circle, e.g. "BS" */
  initials: string;
  /** Full name, e.g. "Brandon Smithwick" */
  name: string;
  /** Specialty tagline, e.g. "Growth Strategy" */
  role: string;
  /** Short bio paragraph */
  description: string;
  /** Optional avatar/photo URL — falls back to initials circle */
  avatarUrl?: string | null;
  /** Links this playbook card to an existing resource by ID */
  linkedResourceId?: string | null;
  /** CTA label shown on the card, e.g. "Value Proposition Roadmap" */
  linkedResourceLabel: string;
  /** Sort order for display (ascending) */
  order: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
