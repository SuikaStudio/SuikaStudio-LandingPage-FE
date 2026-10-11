import { Locale } from "@/types";

export interface Dictionary {
  nav: {
    showcase: string;
    about: string;
    faq: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    exploreBtn: string;
    aboutBtn: string;
    scrollHint: string;
  };
  statement: {
    quote: string;
  };
  showcaseSection: {
    tag: string;
    title: string;
    visitPage: string;
    suikaBot: {
      tag: string;
      title: string;
      desc: string;
      inviteBtn: string;
    };
    fakeSaldo: {
      tag: string;
      title: string;
      desc: string;
      openBtn: string;
    };
  };
  aboutSection: {
    tag: string;
    title: string;
    statement: string;
    pillars: Array<{
      title: string;
      desc: string;
    }>;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  community: {
    tag: string;
    title: string;
    subtitle: string;
  };
  footer: {
    description: string;
    projectsTitle: string;
    socialsTitle: string;
    rights: string;
    studioTag: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  id: {
    nav: {
      showcase: "Karya Kami",
      about: "Tentang Kami",
      faq: "Pertanyaan Umum",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
    },
    hero: {
      title: "Studio Developer Kreatif - Web, IoT, Infra & Bot",
      subtitle:
        "Suika Studio ─ sebuah komunitas Developer dalam merancang, membuat sesuatu, diskusi, belajar, dan tempat eksperimen.",
      exploreBtn: "Lihat Karya Kami",
      aboutBtn: "Tentang Kami",
      scrollHint: "Gulir untuk melihat",
    },
    statement: {
      quote:
        "Kami adalah tim pengembang yang bersemangat dalam merancang hal-hal yang bersifat inovatif dan bermanfaat. Ruang ini adalah pusat resmi kami dan cerminan dari dedikasi kami untuk berekspresi, berkolaborasi, eksperimen, dan belajar untuk menciptakan sesuatu yang bisa mendukung pengembangan di dunia digital untuk seluruh dunia.",
    },
    showcaseSection: {
      tag: "Proyek Unggulan",
      title:
        "Berbagai hasil karya eksperimen kami yang sudah digunakan dan dipercaya oleh banyak orang",
      visitPage: "Kunjungi Halaman",
      suikaBot: {
        tag: "01 / BOT WHATSAPP SERBAGUNA",
        title: "Suika Bot",
        desc: "Suika Bot, bot WhatsApp serbaguna yang memiliki banyak fitur yang kami rancang untuk mempermudah urusan, menghidupkan suasana di grup, dan menawarkan pengalaman yang tidak ada sebelumnya.",
        inviteBtn: "Lihat Selengkapnya",
      },
      fakeSaldo: {
        tag: "02 / WEBSITE",
        title: "Fake Saldo",
        desc: "Fake Saldo - sebuah generator untuk membuat tampilan saldo dan transaksi palsu yang kami rancang untuk keseruan dan membantu teman yang dipinjami duit terus. Fake Saldo berjalan 100% di sisi klien (client-side) tanpa menyimpan dan melacak data pengguna.",
        openBtn: "Lihat Selengkapnya",
      },
    },
    aboutSection: {
      tag: "Tentang Kami",
      title: "Mengapa Kami Ada",
      statement:
        "Suika Studio hadir sebagai rumah sekaligus ruang eksperimen bagi komunitas developer untuk merancang aplikasi Web, perangkat IoT, sistem Infrastruktur, hingga Bot pintar. Kami memadukan diskusi terbuka, semangat belajar bersama, dan eksekusi nyata untuk melahirkan karya digital yang seru serta bermanfaat bagi banyak orang.",
      pillars: [
        {
          title: "Kolaborasi & Diskusi Terbuka",
          desc: "Wadah berkumpulnya para pengembang untuk bertukar pikiran, belajar hal baru, merancang sistem, dan membangun proyek bersama dari nol hingga rilis.",
        },
        {
          title: "Eksperimen Lintas Teknologi",
          desc: "Tidak terpaku pada satu bidang — kami mengeksplorasi pengembangan Web modern, otomasi Bot serbaguna, perangkat IoT, hingga arsitektur Infrastruktur.",
        },
        {
          title: "Inovatif, Seru & Bermanfaat",
          desc: "Setiap karya kami rancang agar ringan digunakan, menghadirkan pengalaman unik yang menghibur, sekaligus mempermudah urusan sehari-hari.",
        },
      ],
    },
    faq: {
      tag: "Tanya Jawab",
      title: "Pertanyaan yang Sering Diajukan",
      subtitle:
        "Jawaban transparan seputar komunitas developer, hasil eksperimen, keamanan privasi, dan ekosistem Suika Studio.",
      items: [
        {
          question: "Apa itu Suika Studio?",
          answer:
            "Suika Studio adalah studio sekaligus komunitas developer kreatif yang bergerak di bidang Web, IoT, Infrastruktur (Infra), dan Bot. Ruang ini menjadi tempat kami berdiskusi, belajar, bereksperimen, serta merilis berbagai karya inovatif yang bisa digunakan oleh publik.",
        },
        {
          question:
            "Apa saja karya unggulan yang sudah dibuat oleh Suika Studio?",
          answer:
            "Saat ini dua karya unggulan kami yang telah digunakan banyak orang adalah Suika Bot (bot WhatsApp serbaguna untuk mempermudah urusan dan meramaikan suasana grup) serta Fake Saldo (website generator tampilan saldo dan transaksi palsu untuk keseruan).",
        },
        {
          question: "Apakah karya dan eksperimen di Suika Studio berbayar?",
          answer:
            "Sebagian besar proyek eksperimen dan perkakas web publik kami dapat diakses serta digunakan secara gratis. Tujuan utama kami adalah berbagi karya yang bermanfaat, seru, dan mendukung ekosistem kreatif di dunia digital.",
        },
      ],
    },
    community: {
      tag: "Terhubung Dengan Kami",
      title: "Ikuti Perkembangan, Eksperimen & Hasil Karya Terbaru Kami",
      subtitle:
        "Dapatkan kabar pembaruan proyek seputar Web, IoT, Infra & Bot, info rilis fitur baru, atau berdiskusi bersama komunitas kami di kanal resmi.",
    },
    footer: {
      description:
        "Studio dan komunitas developer kreatif tempat merancang, berdiskusi, belajar, dan bereksperimen di bidang Web, IoT, Infrastruktur & Bot.",
      projectsTitle: "Karya Kami",
      socialsTitle: "Sosial & Komunitas",
      rights: "Hak cipta dilindungi.",
      studioTag: "Suika Studio • suikastd.dev",
    },
  },
  en: {
    nav: {
      showcase: "Works",
      about: "About Us",
      faq: "FAQ",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      title: "Dev's Creative Studio - Web, IoT, Infra & Bots",
      subtitle:
        "Suika Studio ─ a developer community for building, designing, discussing, learning, and experimentation.",
      exploreBtn: "Explore Our Works",
      aboutBtn: "About the Team",
      scrollHint: "Scroll to explore",
    },
    statement: {
      quote:
        "We are a passionate team of developers dedicated to crafting innovative and useful digital solutions. This space serves as our official hub, reflecting our commitment to expression, collaboration, experimentation, and learning to create tools that support the digital community around the world.",
    },
    showcaseSection: {
      tag: "Featured Works",
      title:
        "A collection of our experimental works that have been utilized and trusted by many users",
      visitPage: "Visit Page",
      suikaBot: {
        tag: "01 / MULTI-FUNCTIONAL WHATSAPP BOT",
        title: "Suika Bot",
        desc: "Suika Bot, a multi-functional WhatsApp bot with a variety of features designed to simplify tasks, enhance group interactions, and provide an unprecedented user experience.",
        inviteBtn: "Visit Project Page",
      },
      fakeSaldo: {
        tag: "02 / WEBSITE",
        title: "Fake Saldo",
        desc: "Fake Saldo - a web interface simulator for generating fake balance and transaction displays, designed for fun and to assist friends who are always borrowing money. Fake Saldo runs entirely client-side in your browser without storing or tracking user data.",
        openBtn: "Visit Project Page",
      },
    },
    aboutSection: {
      tag: "About Us",
      title: "Why We Are Here",
      statement:
        "Suika Studio serves as both a creative home and an experimental playground for our developer community to build across Web, IoT, Infrastructure, and smart Bots. We blend open discussion, continuous learning, and hands-on execution to turn bold ideas into fun and genuinely useful digital products.",
      pillars: [
        {
          title: "Collaboration & Open Discussion",
          desc: "A shared space where developers exchange ideas, learn together, design systems, and build projects from initial concept to public release.",
        },
        {
          title: "Cross-Domain Experimentation",
          desc: "Never limited to a single stack — we actively explore modern Web applications, versatile WhatsApp Bots, IoT hardware, and Infrastructure engineering.",
        },
        {
          title: "Innovative, Fun & Practical",
          desc: "Every creation is engineered to be lightweight, deliver a fresh user experience, and simplify everyday digital tasks.",
        },
      ],
    },
    faq: {
      tag: "FAQ",
      title: "Frequently Asked Questions",
      subtitle:
        "Transparent answers about our developer community, experimental creations, data privacy, and the Suika Studio ecosystem.",
      items: [
        {
          question: "What is Suika Studio?",
          answer:
            "Suika Studio is a creative developer studio and community focused on Web, IoT, Infrastructure, and Bots. It is our dedicated space for discussing, learning, experimenting, and shipping innovative digital tools for everyone.",
        },
        {
          question: "What are the featured projects built by Suika Studio?",
          answer:
            "Our flagship public works trusted by many users include Suika Bot (a multi-functional WhatsApp bot crafted to simplify daily tasks and liven up group chats) and Fake Saldo (a web generator for simulating balance and transaction displays for fun).",
        },
        {
          question: "Are projects under Suika Studio free to use?",
          answer:
            "Yes, most of our public web tools and experimental projects are freely accessible for the community to explore and use. Our core focus is sharing useful, creative solutions while growing together.",
        },
      ],
    },
    community: {
      tag: "Connect With Us",
      title: "Follow Our Latest Experiments & Creations",
      subtitle:
        "Catch project updates across Web, IoT, Infra & Bots, explore new feature releases, or connect with our developer community on our official channels.",
    },
    footer: {
      description:
        "A creative developer studio and community for building, designing, discussing, learning, and experimenting across Web, IoT, Infrastructure & Bots.",
      projectsTitle: "Our Works",
      socialsTitle: "Social & Community",
      rights: "All rights reserved.",
      studioTag: "Suika Studio • suikastd.dev",
    },
  },
};
