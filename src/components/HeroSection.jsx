import Image from "next/image";
import { ReusableButton } from "./ui/ReusableButton";
import RoundedText from "./ui/RoundedText";

export default function HeroSection() {
  return (
    <section className='relative w-full overflow-hidden '>
      <div className='mx-auto max-w-[1400px] px-4 py-16'>
        <div className='flex flex-col items-center justify-between gap-20 lg:flex-row lg:items-start'>
          {/* Text Content */}
          <div className='relative z-10 '>
            <h1 className='font-lora text-[2.5rem] text-base leading-tight text-black md:text-[3.5rem] lg:text-[4rem]'>
              Ярмак Тетяна Валеріївна
              <br />
              Засновниця центру &quot;ЛОГОДАР&quot;
              <br />
              <span className='mt-2 block text-[2rem] md:text-[2.75rem] lg:text-[3.25rem]'>
                | Логопед, арт-терапевт,
                <br />
                бізнес-тренер
              </span>
            </h1>

            <p className='mt-6 max-w-[500px] text-base font-roboto text-gray-600'>
              21 рік педагогічного досвіду, понад 29 000 логопедичних
              консультацій. Авторка навчальних вебінарів для фахівців,
              організаторка міжнародних конференцій. Досвід допомоги
              онкопацієнтам, учасникам бойових дій та людям, які перенесли
              інсульт.
            </p>

            <div className='flex items-center justify-center lg:justify-start gap-8 mt-10'>
              <button
                className='w-16 h-16 rounded-full border-2 pl-2 border-orange flex items-center justify-center text-orange 
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
          <div className='relative mt-18 w-full max-w-[514px]'>
            <div className='relative aspect-[514/567] w-full'>
              <Image
                src='/hero.png'
                alt='Professional portrait'
                fill
                className='object-cover'
                priority
              />
            </div>

            {/* Decorative Elements */}
            <div className='absolute bottom-[-5rem] left-[-5rem]'>
              {/* <Image src='/image.png' alt='' fill className='object-contain' /> */}
              <RoundedText />
            </div>

            <div className='absolute left-[-118px] top-56 h-[144px] w-[191px]'>
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
