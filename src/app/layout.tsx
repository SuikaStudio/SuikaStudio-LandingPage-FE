import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { siteConfig } from '@/data/siteConfig';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const seoTitle = 'Suika Studio — Creative Developer Studio (Web, IoT, Infra & Bots)';
const seoDescription =
  'Suika Studio Developer (suikastd.dev) is a creative developer studio and community for building, designing, discussing, learning, and experimenting across Web, IoT, Infrastructure, and multi-functional Bots like Suika Bot & Fake Saldo.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoTitle,
    template: '%s | Suika Studio',
  },
  description: seoDescription,
  applicationName: siteConfig.name,
  keywords: [
    'Suika Studio',
    'Suika Studio Developer',
    'suikastd.dev',
    'Suika Bot',
    'Bot WhatsApp Serbaguna',
    'Bot WhatsApp Indonesia',
    'Multi-functional WhatsApp Bot',
    'Fake Saldo',
    'Generator Saldo Palsu',
    'Simulator Saldo Digital',
    'Digital Balance Simulator',
    'Studio Developer Kreatif',
    'Creative Developer Studio',
    'Komunitas Developer Indonesia',
    'Web Development',
    'IoT',
    'Infrastructure',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': siteConfig.url,
      'id-ID': siteConfig.url,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Suika Studio — Creative Developer Studio (Web, IoT, Infra & Bots)',
      },
    ],
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: ['/brand/og-image.png'],
    creator: '@suikastudio',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      alternateName: ['Suika Studio Developer', 'suikastd.dev'],
      url: siteConfig.url,
      description: seoDescription,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/brand/logo-icon.png`,
        width: 512,
        height: 512,
      },
      image: `${siteConfig.url}/brand/og-image.png`,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.instagram,
        siteConfig.links.tiktok,
        siteConfig.links.facebook,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: ['Suika Studio Developer', 'suikastd.dev'],
      description: seoDescription,
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
      inLanguage: ['id', 'en'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Suika Bot',
      url: siteConfig.links.botInvite,
      image: `${siteConfig.url}${siteConfig.projectImages.suikaBot}`,
      applicationCategory: 'CommunicationApplication',
      operatingSystem: 'WhatsApp',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Suika Bot is a multi-functional WhatsApp bot with a variety of features designed to simplify tasks, enhance group interactions, and provide an unprecedented user experience.',
      author: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    {
      '@type': 'WebApplication',
      name: 'Fake Saldo',
      url: siteConfig.links.fakeSaldo,
      image: `${siteConfig.url}${siteConfig.projectImages.fakeSaldo}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'A client-side web interface simulator for generating fake balance and transaction displays for fun without storing or tracking user data.',
      author: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteConfig.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Apa itu Suika Studio? / What is Suika Studio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suika Studio adalah studio sekaligus komunitas developer kreatif yang bergerak di bidang Web, IoT, Infrastruktur (Infra), dan Bot. Ruang ini menjadi tempat berdiskusi, belajar, bereksperimen, serta merilis berbagai karya inovatif yang bisa digunakan oleh publik.',
          },
        },
        {
          '@type': 'Question',
          name: 'Apa saja karya unggulan yang sudah dibuat oleh Suika Studio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dua karya unggulan kami yang telah digunakan banyak orang adalah Suika Bot (bot WhatsApp serbaguna untuk mempermudah urusan dan meramaikan suasana grup) serta Fake Saldo (website generator tampilan saldo dan transaksi palsu untuk keseruan).',
          },
        },
        {
          '@type': 'Question',
          name: 'Apakah karya dan eksperimen di Suika Studio berbayar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sebagian besar proyek eksperimen dan perkakas web publik kami dapat diakses serta digunakan secara gratis untuk berbagi karya yang bermanfaat, seru, dan mendukung ekosistem kreatif di dunia digital.',
          },
        },
        {
          '@type': 'Question',
          name: 'Apakah data saya aman saat menggunakan Fake Saldo atau Suika Bot?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sangat aman. Fake Saldo berjalan 100% di sisi klien (client-side) langsung di browser tanpa menyimpan atau melacak data pengguna di server. Suika Bot juga dirancang dengan mengutamakan privasi serta keamanan interaksi di grup maupun chat WhatsApp.',
          },
        },
        {
          '@type': 'Question',
          name: 'Bagaimana cara terhubung, belajar bareng, atau berkolaborasi dengan Suika Studio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Anda dapat mengikuti informasi terbaru di Saluran WhatsApp resmi kami, menyapa tim di sosial media (Instagram, TikTok, Facebook), atau ikut berdiskusi dan berkontribusi langsung di repositori GitHub Suika Studio.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const s = localStorage.getItem('suika_theme');
                const p = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = s === 'dark' || (!s && p);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
