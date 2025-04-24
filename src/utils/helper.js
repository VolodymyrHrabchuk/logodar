// SocialButtons.jsx
import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsApp,
  YouTube,
} from "@/components/ui/Icons";

import SocialButton from "@/components/ui/ReusableButton";

const socialMediaData = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://www.facebook.com/TatyanaYarmakLOGODAR/",
  },
  {
    name: "Telegram",
    icon: TelegramIcon,
    url: "https://t.me/KMDSY",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/logoped_tatyana_yarmak",
  },
  {
    name: "WhatsApp",
    icon: WhatsApp,
    url: "https://wa.me/380666144424",
  },
  {
    name: "Youtube",
    icon: YouTube,
    url: "https://www.youtube.com/@ТетянаЯРМАК_В",
  },
];

export const SocialButtons = ({ className = "", ...props }) => {
  return (
    <div className={`flex  ${className}`} {...props}>
      {socialMediaData.map((social) => (
        <SocialButton
          key={social.name}
          icon={social.icon}
          url={social.url}
          name={social.name}
        />
      ))}
    </div>
  );
};
