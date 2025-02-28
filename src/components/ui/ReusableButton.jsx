import React from "react";
import Link from "next/link";
export const ReusableButton = ({
  text,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} py-3 px-12 md:px-10 rounded-full transition font-roboto font-normal text-sm md:text-base 
        ${
          disabled
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-700"
        }`}
    >
      {text}
    </button>
  );
};

const SocialButton = ({ icon: Icon, url, name }) => (
  <Link
    href={url}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={name}
    style={{ justifyItems: "center" }}
  >
    <button className='w-10 h-10 flex items-center justify-center p-2 rounded-lg border-[3px] border-orange bg-black hover:bg-grey transition-colors group'>
      <Icon className='w-5 h-5 text-white transition-colors' />
    </button>
  </Link>
);

export default SocialButton;
