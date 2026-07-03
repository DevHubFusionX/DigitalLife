import type { Resource } from '../types/resource';

/**
 * Hard-coded fallback resources.
 * These are seeded into Firestore via Admin > Settings > "Seed Firestore".
 * The IDs ('1'–'8') match the existing URL routing (/resources/1 etc.)
 */
export const DEFAULT_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'The 2026 State of Scale Report',
    category: 'Strategy',
    format: 'Ebook',
    description:
      'Discover the core organizational and financial hurdles shaping early-stage scaleups in 2026. A comprehensive guide mapping operational efficiency, cash flow runway bottlenecks, and digital positioning.',
    coverBg: 'from-[#0f172a] to-[#1e293b]',
    coverTitle: '2026 STATE OF SCALE',
    fileSize: '4.8 MB (PDF)',
    softwareRequired: 'Any PDF Reader',
    deliverables: [
      '45-page detailed macro-trend breakdown',
      'Key data surveys from 300+ MSME founders',
      'Recommended operations software index',
      '3 strategic frameworks for scaling budgets',
    ],
    outcomes: [
      'Recognize structural cash-leaks before they impact your payroll runway.',
      'Implement benchmark tools to rate your teams operational velocity.',
      'Align client delivery frameworks with authority positioning strategy.',
    ],
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'MSME Operations Blueprint',
    category: 'Operations',
    format: 'Template',
    description:
      'A plug-and-play documentation system to map SOPs, tools, and delegation matrices in your team. Create clarity and streamline new staff onboarding.',
    coverBg: 'from-[#3e4095] to-[#2563eb]',
    coverTitle: 'OPERATIONS BLUEPRINT',
    fileSize: '1.2 MB (Word / Notion Template)',
    softwareRequired: 'Notion account or Microsoft Word',
    deliverables: [
      'Fully customizable SOP database structure',
      'Pre-filled templates for 12 standard team workflows',
      'Delegation escalation logic matrix',
      'Onboarding checklist dashboard layout',
    ],
    outcomes: [
      'Build a centralized, searchable systems portal in less than 48 hours.',
      'Delegate onboarding coordination to automation structures.',
      'Reduce operational errors by aligning workflows visually.',
    ],
    isFree: false,
    price: 9.99,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Operations Dashboards & Reports Template',
    category: 'Operations',
    format: 'Template',
    description:
      'Track team performance, lead velocity, and operational KPIs in this unified Google Sheets model. Designed specifically for agencies and services firms.',
    coverBg: 'from-[#0d9488] to-[#14b8a6]',
    coverTitle: 'KPI DASHBOARDS',
    fileSize: '850 KB (Google Sheets)',
    softwareRequired: 'Google Account (Sheets)',
    deliverables: [
      'Interactive dashboard tab with charts',
      'Raw data intake sheets with sample metrics',
      'Lead-to-onboard duration calculator formulas',
      'Monthly executive report formatting tab',
    ],
    outcomes: [
      'Uncover exact project bottlenecks in under 10 minutes per week.',
      'Provide stakeholders with pristine, live-updated dashboard visuals.',
      'Calculate true team capacity metrics mathematically.',
    ],
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'The Authority Framework Guide',
    category: 'Marketing',
    format: 'Guides',
    description:
      'A complete manual on establishing authority-driven content on social media with zero ad budget.',
    coverBg: 'from-[#0f1712] to-[#1c2e24]',
    coverTitle: 'AUTHORITY BRANDING',
    isFree: false,
    price: 6.00,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'AI & Marketing Automation Toolkit',
    category: 'AI & Tech',
    format: 'Kit',
    description:
      'Pre-configured email drip templates, AI prompts, CRM integrations, and segmentation rules.',
    coverBg: 'from-[#4c1d95] to-[#7c3aed]',
    coverTitle: 'AUTOMATION TRIGGERS',
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Founder Delegation Playbook',
    category: 'Leadership',
    format: 'Guides',
    description:
      'How to extract yourself from day-to-day operations and build a self-managing leadership team.',
    coverBg: 'from-[#854d0e] to-[#b45309]',
    coverTitle: 'DELEGATION MATRIX',
    isFree: false,
    price: 12.50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
