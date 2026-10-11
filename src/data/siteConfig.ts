export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  links: {
    github: string;
    instagram: string;
    tiktok: string;
    facebook: string;
    botInvite: string;
    fakeSaldo: string;
  };
  projectImages: {
    suikaBot: string;
    fakeSaldo: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Suika Studio",
  domain: "suikastd.dev",
  url: "https://suikastd.dev",
  links: {
    github: "https://github.com/suikastudio",
    instagram: "https://instagram.com/suikastudio.dev",
    tiktok: "https://tiktok.com/@suikastudio.dev",
    facebook: "https://facebook.com/suikastudio.dev",
    botInvite: "https://bot.suikastd.dev",
    fakeSaldo: "https://fekk-saldo.suikastd.dev",
  },
  projectImages: {
    suikaBot: "/projects/suikabot-preview.webp",
    fakeSaldo: "/projects/fekk-saldo-preview.webp",
  },
};
