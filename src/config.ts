import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://junghyun-kim.github.io/astro-blog-test/",
  author: "5ducks",
  desc: "한 사람의 취향을 깊이 파는 큐레이션 매거진",
  title: "5ducks",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "ko",
  langTag: ["ko-KR"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/junghyun-kim",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@5ducks.io",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/",
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "Twitch",
    href: "https://twitch.tv/",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com/",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Snapchat",
    href: "https://snapchat.com/",
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/",
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/",
    linkTitle: `${SITE.title} on TikTok`,
    active: false,
  },
  {
    name: "CodePen",
    href: "https://codepen.io/",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://discord.com/",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://reddit.com/",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Skype",
    href: "https://skype.com/",
    linkTitle: `${SITE.title} on Skype`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://store.steampowered.com/",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://telegram.org/",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
