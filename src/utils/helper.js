// SocialButtons.jsx
import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/Icons";

import SocialButton from "@/components/ui/ReusableButton"; // Use ES6 import

const socialMediaData = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://www.facebook.com", // Replace with actual URLs
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    url: "https://www.twitter.com",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com",
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    url: "https://www.linkedin.com",
  },
];

export const SocialButtons = ({ className = "", ...props }) => {
  return (
    <div className={`flex  gap-5 ${className}`} {...props}>
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
