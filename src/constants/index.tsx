import { ReactComponent as TwitterIcon } from "../assets/icons/twitter.svg";
import { ReactComponent as DiscordIcon } from "../assets/icons/discord.svg";
import { ReactComponent as MediumIcon } from "../assets/icons/medium.svg";
import { ReactComponent as YoutubeIcon } from "../assets/icons/youtube.svg";
import { ReactComponent as TiktokIcon } from "../assets/icons/tiktok.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagram.svg";

export const socialLinks = {
  twitter: "https://twitter.com/coolcats",
  medium: "#",
  discord: "https://discord.com/invite/coolcatsnft",
  youtube: "https://www.youtube.com/c/CoolCatsNFT",
  tiktok: "https://www.tiktok.com/@coolcatsnft",
  instagram: "https://www.instagram.com/coolcatsnft/",
};

export const socialContentData = [
  {
    title: "Twitter",
    Icon: TwitterIcon,
    link: socialLinks.twitter,
  },
  {
    title: "Discord",
    Icon: DiscordIcon,
    link: socialLinks.discord,
  },
  {
    title: "Medium",
    Icon: MediumIcon,
    link: socialLinks.medium,
  },
  {
    title: "Youtube",
    Icon: YoutubeIcon,
    link: socialLinks.youtube,
  },
  {
    title: "Instagram",
    Icon: InstagramIcon,
    link: socialLinks.instagram,
  },
  {
    title: "Tiktok",
    Icon: TiktokIcon,
    link: socialLinks.tiktok,
  },
];
