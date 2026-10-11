export type Locale = 'id' | 'en';

export type ProductStatus = 'live' | 'web-tool' | 'beta' | 'open-source';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: LocalizedText;
  description: LocalizedText;
  status: ProductStatus;
  statusLabel: LocalizedText;
  features: LocalizedText[];
  primaryLink: {
    label: LocalizedText;
    href: string;
    isExternal?: boolean;
  };
  secondaryLink?: {
    label: LocalizedText;
    href: string;
    isExternal?: boolean;
  };
}

export interface PillarItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  iconName: 'sparkles' | 'users' | 'shield';
}

export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  links: {
    discord: string;
    github: string;
    botInvite: string;
    fakeSaldo: string;
  };
}

