"use client";

import Image from "next/image";
import { useState } from "react";
import ConsultationForm from "./FormPopup";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({
  scrollToBlog,
  scrollToConsultation,
  scrollToSpecialists,
  isSpecialistsPage = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSpecialistsClick = () => {
    if (isSpecialistsPage) {
      // Already on specialists page, maybe scroll to top or do nothing
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (scrollToSpecialists) {
      // On homepage with scroll function available
      scrollToSpecialists();
    } else {
      // Navigate to specialists page
      router.push("/specialists");
    }
  };

  return (
    <nav className='relative z-10 py-4 px-4 md:px-6 2xl:px-20 flex items-center justify-between'>
      {/* Logo */}
      <div className='text-orange font-bold text-2xl flex items-center gap-2'>
        <Link href='/' className='flex items-center relative w-14 h-14'>
          <Image src='/logo.svg' alt='Logo' fill className='object-contain' />
        </Link>
        <p className='hidden md:block text-grey font-roboto text-base font-normal '>
          «Памятайте – мовлення важливе!» Т.Ярмак
        </p>
      </div>

      {/* Navigation Links - Visible on screens >= tablet */}
      <div className='hidden md:flex space-x-6 lg:space-x-14 text-grey'>
        {scrollToBlog ? (
          <button
            onClick={scrollToBlog}
            className='hover:underline cursor-pointer'
          >
            Блог
          </button>
        ) : (
          <Link href='/#blog' className='hover:underline cursor-pointer'>
            Блог
          </Link>
        )}

        {scrollToConsultation ? (
          <button
            onClick={scrollToConsultation}
            className='hover:underline cursor-pointer'
          >
            Консультації
          </button>
        ) : (
          <Link
            href='/#consultation'
            className='hover:underline cursor-pointer'
          >
            Консультації
          </Link>
        )}

        <button
          onClick={handleSpecialistsClick}
          className={`hover:underline cursor-pointer ${
            isSpecialistsPage ? "font-semibold text-black" : ""
          }`}
        >
          Каталог спеціалістів
        </button>
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
