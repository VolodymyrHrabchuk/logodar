import Link from "next/link";

import Image from "next/image";
import { SocialButtons } from "@/utils/helper";

export default function Footer() {
  return (
    <footer className='relative bg-background px-4 py-3 pb-4 md:py-12 overflow-hidden'>
      {/* Blurred circles */}
      <div className='absolute -left-2/3 md:top-0 md:left-0 w-[800px] h-[800px] -translate-x-1/2 bg-orange/10 rounded-full blur-[100px]' />
      <div className='hidden md:block absolute md:bottom-0 md:right-0 w-[400px] h-[400px] translate-x-1/4 bg-orange/10 rounded-full blur-[100px]' />

      <div className='container relative mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Company Info */}
          <div className='space-y-6'>
            <Link href='/' className='hidden md:inline-block'>
              <Image src={"/logo.svg"} alt='Logo' width={70} height={70} />
            </Link>
            <p className='hidden md:block text-grey font-roboto text-base'>
              Risus commodo viverra maecenas accumsan lacus vel facilisis
              volutpat est Elit pellentesque habitant.
            </p>
            <div className='space-y-2'>
              <h3 className='font-lora uppercase font-base relative pb-2'>
                OPEN HOURS
                <div className='absolute left-0  bottom-0 h-[0.19rem] w-[4.5rem] bg-orange' />
              </h3>
              <p className='text-grey font-roboto text-base'>
                Monday - Saturday : 10 AM - 07 PM
              </p>
            </div>
            <SocialButtons className='flex items-start gap-2' />
          </div>

          {/* Sections */}
          <div className='hidden md:block'>
            <h3 className='font-lora font-base text-black mb-6 relative'>
              Розділи{" "}
              <div className='absolute left-0  bottom-0 h-[0.19rem] w-[4.5rem] bg-orange' />
            </h3>
            <ul className='space-y-4'>
              <li>
                <Link href='#' className='text-grey hover:underline '>
                  Про Тетяну
                </Link>
              </li>
              <li>
                <Link href='#' className='text-grey hover:underline'>
                  Блог
                </Link>
              </li>
              <li>
                <Link href='#' className='text-grey hover:underline'>
                  Консультації
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className='hidden md:block'>
            <h3 className='font-lora font-base text-black mb-6 relative'>
              Послуги{" "}
              <div className='absolute left-0  bottom-0 h-[0.19rem] w-[4.5rem] bg-orange' />
            </h3>
            <ul className='space-y-4'>
              <li>
                <Link href='#' className='text-grey hover:underline'>
                  Індивідуальні консультації
                </Link>
              </li>
              <li>
                <Link href='#' className='text-grey hover:underline'>
                  Освітні продукти
                </Link>
              </li>
              <li>
                <Link href='#' className='text-grey hover:underline'>
                  Спеціалісти
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className='font-lora font-base text-black mb-6 relative'>
              Контакти{" "}
              <div className='absolute left-0  bottom-0 h-[0.19rem] w-[4.5rem] bg-orange' />
            </h3>
            <ul className='space-y-4'>
              <li className='text-grey'>(+1)422-200-1077</li>
              <li>
                <Link
                  href='mailto:company@mail.com'
                  className='text-grey hover:underline'
                >
                  company@mail.com
                </Link>
              </li>
              <li className='text-grey'>
                Clary 5, Ste 97, San Francisco, CA, 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-12 pt-8 border-t border-border'>
          <p className='text-center text-sm text-grey'>
            Copyright by Логодар™ – All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
