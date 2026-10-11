import { ProductItem } from '@/types';
import { siteConfig } from './siteConfig';

export const products: ProductItem[] = [
  {
    id: 'suika-bot',
    name: 'Suika Bot',
    tagline: {
      id: 'Bot komunitas serbaguna untuk server Discord.',
      en: 'Versatile community automation bot for Discord servers.',
    },
    description: {
      id: 'Membantu mengelola server Discord dengan automasi pesan, sistem leveling, moderasi pintar, dan mini-games interaktif yang ramah pengguna.',
      en: 'Helps manage Discord communities with automated messaging, leveling systems, smart moderation, and delightful interactive mini-games.',
    },
    status: 'live',
    statusLabel: {
      id: 'Aktif / Live',
      en: 'Active / Live',
    },
    features: [
      {
        id: 'Moderasi cerdas & auto-filter pesan',
        en: 'Smart moderation & automated message filters',
      },
      {
        id: 'Mini-games & hiburan interaktif',
        en: 'Interactive mini-games & community entertainment',
      },
      {
        id: 'Sistem reputasi, level, & custom commands',
        en: 'Reputation, leveling system, & custom commands',
      },
      {
        id: 'Performa tinggi dengan 99.9% uptime',
        en: 'High performance with 99.9% uptime guarantee',
      },
    ],
    primaryLink: {
      label: {
        id: 'Undang Bot ke Server',
        en: 'Invite Bot to Server',
      },
      href: siteConfig.links.botInvite,
      isExternal: true,
    },
  },
  {
    id: 'fake-saldo',
    name: 'Fake Saldo',
    tagline: {
      id: 'Simulator tampilan transaksi & mockup saldo digital.',
      en: 'Digital balance & transaction interface mockup simulator.',
    },
    description: {
      id: 'Web generator praktis untuk menyimulasikan tampilan saldo e-wallet dan mutasi transaksi guna keperluan riset desain, prototipe antarmuka, dan presentasi QA.',
      en: 'Lightweight web generator to simulate e-wallet balance screens and transaction flows for design research, UI/UX prototyping, and QA presentations.',
    },
    status: 'web-tool',
    statusLabel: {
      id: 'Web Tool',
      en: 'Web Tool',
    },
    features: [
      {
        id: 'Template antarmuka aplikasi populer yang presisi',
        en: 'Pixel-perfect templates of popular app interfaces',
      },
      {
        id: 'Kustomisasi saldo, nama, tanggal, & mutasi instan',
        en: 'Instant customization of balance, names, and logs',
      },
      {
        id: 'Ekspor gambar beresolusi tinggi langsung di browser',
        en: 'High-resolution image export running in-browser',
      },
      {
        id: '100% aman, data privat tidak dikirim ke server',
        en: '100% safe, client-side only with no server data upload',
      },
    ],
    primaryLink: {
      label: {
        id: 'Buka Simulator',
        en: 'Open Simulator',
      },
      href: siteConfig.links.fakeSaldo,
      isExternal: true,
    },
  },
];
