import type { ReactNode } from "react";
import FB from "./icons/FB";
import IG from "./icons/IG";
import LinkedIn from "./icons/LinkedIn";
import Maps from "./icons/Maps";
import SnapChat from "./icons/SnapChat";
import Telegram from "./icons/Telegram";
import Threads from "./icons/Threads";
import TikTok from "./icons/TikTok";
import Twitter from "./icons/Twitter";
import Viper from "./icons/Viper";
import Website from "./icons/Website";
import Weechat from "./icons/Weechat";
import WhatsApp from "./icons/WhatsApp";
import Youtube from "./icons/Youtube";

type SocialMedia = {
  label: string;
  icon: ReactNode;
};
export const socialMedia: Record<string, SocialMedia> = {
  facebook: { label: "صفحة Facebook", icon: <FB /> },
  instagram: { label: "صفحة Instagram", icon: <IG /> },
  threads: { label: "صفحة Threads", icon: <Threads /> },
  "google maps": { label: "رابط الموقع علي Google Maps", icon: <Maps /> },
  tiktok: { label: "صفحة Tiktok", icon: <TikTok /> },
  website: { label: "الموقع الإلكتروني", icon: <Website /> },
  linkedin: { label: "صفحة Linkedin", icon: <LinkedIn /> },
  youtube: { label: "صفحة Youtube", icon: <Youtube /> },
  X: { label: "صفحة X (تويتر)", icon: <Twitter /> },
  snapchat: { label: "صفحة Snapchat", icon: <SnapChat /> },
  weechat: { label: "صفحة Weechat", icon: <Weechat /> },
  viper: { label: "صفحة Viper", icon: <Viper /> },
  whatsapp: { label: "صفحة Whatsapp", icon: <WhatsApp /> },
  telegram: { label: "صفحة Telegram", icon: <Telegram /> },
};
