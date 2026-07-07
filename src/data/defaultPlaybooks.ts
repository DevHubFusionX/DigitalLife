import type { Playbook } from '../types/playbook';

/**
 * Hard-coded fallback playbooks matching the 3 currently on the Resources page.
 * Seeded into Firestore via Admin > Settings > "Seed Playbooks".
 */
export const DEFAULT_PLAYBOOKS: Playbook[] = [
  {
    id: 'playbook-1',
    initials: 'BS',
    name: 'Brandon Smithwick',
    role: 'Growth Strategy',
    description:
      'Experienced strategist focusing on value propositions and packaging models. Brandon specializes in helping early-stage service teams build authority and package capabilities to command high-ticket pricing.',
    linkedResourceId: '1',
    linkedResourceLabel: 'Value Proposition Roadmap',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'playbook-2',
    initials: 'GJ',
    name: 'Gabrielle Judge',
    role: 'Productivity & SOPs',
    description:
      'Workflow specialist and TEDx speaker focused on helping entrepreneurs remove bottleneck dependencies. Gabrielle builds minimal tools and operational protocols to streamline onboarding and delivery pipelines.',
    linkedResourceId: '6',
    linkedResourceLabel: 'SOP Delegation Playbook',
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'playbook-3',
    initials: 'VC',
    name: 'Valerie Chapman',
    role: 'Marketing & Authority',
    description:
      'Founder & consultant specialized in bridging the authority gap. Valerie focuses on content architecture models, helping B2B teams and service agencies build audience channels on zero advertising spend.',
    linkedResourceId: '4',
    linkedResourceLabel: 'Organic Authority Guide',
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
