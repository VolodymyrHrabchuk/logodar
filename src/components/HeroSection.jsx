import Image from "next/image";
import { ReusableButton } from "./ui/ReusableButton";
import RoundedText from "./ui/RoundedText";

export default function HeroSection() {
  return (
    <section className='relative w-full overflow-hidden z-0'>
      <div className='mx-auto max-w-[1400px] px-4 py-6 md:py-20'>
        <div className='flex flex-col-reverse items-center justify-between md:gap-20 lg:flex-row lg:items-start'>
          {/* Text Content */}
          <div className='relative z-10 text-center lg:text-left lg:w-1/2'>
            <h1 className='font-lora text-2xl mt-10 md:mt-0 leading-tight text-black md:text-[3rem] lg:text-[3.25rem] w-full'>
              <span className='md:whitespace-nowrap'>
                Інноваційний реабілітаційний
              </span>{" "}
              <span className='md:whitespace-nowrap'>
                онлайн центр Тетяни Ярмак
              </span>
              <br />
              &quot;ЛОГОДАР&quot;
            </h1>

            <p className='mt-5 md:mt-6 max-w-[500px] text-sm md:text-base font-roboto text-grey mx-auto lg:mx-0'>
              Відновлення мови та мовлення при тяжких порушеннях.
              Освітньо-тренінгові послуги для логопедів, терапевтів мови та
              мовлення, фахівців реабілітаційного напрямку, психологів.
            </p>

            <div className='flex items-center justify-center lg:justify-start gap-8 mt-5 md:mt-10'>
              {/* Play Button - Hidden on Mobile */}
              <button
                className='hidden lg:flex w-16 h-16 rounded-full border-2 pl-2 border-orange items-center justify-center text-orange 
                 hover:bg-orange/20 hover:text-white transition duration-300 group'
                aria-label='Play'
              >
                {/* Inline SVG for Play Icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 stroke-black fill-none group-hover:stroke-transparent group-hover:fill-white transition-colors duration-300'
                  viewBox='0 0 73 75'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M62.6697 40.5394L5.73568 73.053C3.40239 74.3855 0.500004 72.7006 0.500004 70.0137L0.500007 4.98655C0.500007 2.29958 3.40239 0.614747 5.73568 1.94723L62.6697 34.4608C65.0221 35.8042 65.0221 39.196 62.6697 40.5394Z' />
                </svg>
              </button>
              <ReusableButton text='Детальніше' />
            </div>
          </div>

          {/* Image Section */}
          <div className='relative w-full max-w-[514px] lg:w-1/2 flex justify-center lg:justify-end'>
            <div className='relative aspect-[514/567] w-[314px] sm:w-full'>
              <Image
                src='/hero.jpg'
                alt='Professional portrait'
                fill
                className='object-cover rounded-t-full'
                priority
              />
            </div>

            {/* Decorative Elements */}
            <div className='absolute -bottom-6 -left-1 md:bottom-[-5rem] md:left-[-5rem]'>
              <RoundedText />
            </div>

            <div className='absolute md:left-[-118px] right-7 top-7 md:top-56 h-[64px] w-[92px] md:h-[144px] md:w-[191px] lg:block '>
              <Image
                src='/elements.png'
                alt=''
                fill
                className='object-contain'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
