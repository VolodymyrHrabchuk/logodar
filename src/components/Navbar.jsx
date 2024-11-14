// components/Navbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import ConsultationForm from "./FormPopup";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='relative z-10 py-4 px-4 md:px-6 2xl:px-20 flex items-center justify-between'>
      {/* Logo */}
      <div className='text-orange font-bold text-2xl'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={40}
            height={40}
            className='h-14 w-14'
          />
        </Link>
      </div>

      {/* Navigation Links - Visible on screens >= tablet */}
      <div className='hidden md:flex space-x-6 lg:space-x-14 text-grey'>
        <Link href='/pages' className='hover:underline'>
          Блог
        </Link>
        <Link href='/services' className='hover:underline'>
          Консультації
        </Link>
        <Link href='/blog' className='hover:underline'>
          Каталог спеціалістів
        </Link>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center space-x-4'>
        {/* Orange Button - Hidden on mobile, visible on screens >= tablet */}
        <button
          onClick={() => setIsOpen(true)}
          className='border-2 text-sm md:text-base border-orange text-black px-4 md:px-6 py-2 rounded-md hover:bg-orange/20 transition'
        >
          Записатися на консультацію
        </button>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
