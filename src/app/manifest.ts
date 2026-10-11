import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Creative Developer Studio (Web, IoT, Infra & Bots)`,
    short_name: siteConfig.name,
    description:
      'Suika Studio is a creative developer studio and community for building, experimenting, and shipping Web apps, IoT, Infrastructure, and multi-functional WhatsApp Bots (Suika Bot & Fake Saldo).',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: '/brand/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/brand/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}

