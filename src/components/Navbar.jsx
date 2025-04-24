// components/navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const ConsultationForm = dynamic(() => import("./FormPopup"), { ssr: false });

export default function Navbar({
  heroRef,
  scrollToBlog,
  scrollToConsultation,
  scrollToSpecialists,
  isSpecialistsPage = false,
}) {
  const navRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const router = useRouter();

  // 1) measure nav height on mount & resize
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // 2) observe hero with rootMargin = -navHeight
  useEffect(() => {
    const heroEl = heroRef?.current;
    if (!heroEl || navHeight === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldStick = !entry.isIntersecting;
        setIsSticky((prev) => (prev === shouldStick ? prev : shouldStick));
      },
      {
        root: null,
        rootMargin: `-${navHeight}px 0px 0px 0px`,
        threshold: 0,
      }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [heroRef, navHeight]);

  const handleSpecialistsClick = () => {
    if (isSpecialistsPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (scrollToSpecialists) {
      scrollToSpecialists();
    } else {
      router.push("/specialists");
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`
          transition-all duration-300 py-4 px-4 md:px-6 2xl:px-20
          flex items-center justify-between
          ${
            isSticky
              ? "fixed top-0 left-0 right-0 bg-[#ebebeb] shadow-md z-50"
              : "relative bg-transparent"
          }
        `}
      >
        {/* logo, links, buttons... */}
        <div className='flex items-center gap-2 text-orange font-bold text-2xl'>
          <Link href='/' className='relative w-14 h-14'>
            <Image src='/logo.svg' alt='Logo' fill className='object-contain' />
          </Link>
          <p className='hidden md:block text-grey font-roboto text-base'>
            «Памятайте – мовлення важливе!» Т. Ярмак
          </p>
        </div>

        <div className='hidden md:flex space-x-6 lg:space-x-14 text-grey'>
          <button onClick={scrollToBlog} className='hover:underline'>
            Блог
          </button>
          <button onClick={scrollToConsultation} className='hover:underline'>
            Консультації
          </button>
          <button
            onClick={handleSpecialistsClick}
            className={`hover:underline ${isSpecialistsPage ? "font-semibold text-black" : ""}`}
          >
            Каталог спеціалістів
          </button>
        </div>

        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setConsultOpen(true)}
            className='hidden md:block border-2 border-orange px-6 py-2 rounded-md text-black hover:bg-orange/20 transition'
          >
            Записатися на консультацію
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className='md:hidden'
            aria-label='Open menu'
          >
            <Menu className='w-6 h-6 text-grey' />
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className='fixed inset-0 bg-orange z-50 flex flex-col'
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* …mobile menu… */}
            </motion.div>
          )}
        </AnimatePresence>

        <ConsultationForm isOpen={consultOpen} setIsOpen={setConsultOpen} />
      </nav>

      {/* 3) spacer only when fixed */}
      {isSticky && <div style={{ height: navHeight }} aria-hidden='true' />}
    </>
  );
}
