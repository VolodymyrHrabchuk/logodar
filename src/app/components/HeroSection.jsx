import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className='relative z-10 py-16 px-2 flex max-w-[1400px] w-full mx-auto'>
      <div className=' w-full flex flex-col lg:flex-row items-center justify-center '>
        <div className=' mb-10 lg:mb-0 max-w-[719px] w-full'>
          <h1 className='text-6xl  leading-tight text-gray-800 mb-6 font-judson'>
            Lorem ipsum dolor sit amet consectetur. Dictum tempus etiam amet
            metus
          </h1>
          <p className='text-gray-600 font-md mb-8 font-inter max-w-[400px]'>
            Lorem ipsum dolor sit amet consectetur. Dictum tempus etiam amet
            metus. Nec arcu cras cras sit porttitor. Consequat aliquam eget
            scelerisque nullam lacus. Fermentum maecenas eu feugiat aliquam
            nisl.
          </p>
          <div className='flex items-center justify-center lg:justify-start gap-[74px]'>
            <button
              className='w-16 h-16 rounded-full border-2 pl-2 border-orange flex items-center justify-center text-orange 
             hover:bg-orange hover:text-white transition duration-300 group'
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
            <button className='bg-black text-white py-3 px-9 rounded-full hover:bg-gray-800 transition font-inter font-normal uppercase'>
              Learn More
            </button>
          </div>
        </div>
        <div className='  relative'>
          <Image src='/hero.png' alt='Hero Image' width={414} height={457} />
          <Image
            src='/image.png'
            alt='Circle Image'
            width={200}
            height={200}
            className='absolute bottom-[-80px] left-[-100px] '
          />
          <Image
            src='/elements.png'
            alt='Circle Image'
            width={159}
            height={120}
            className='absolute top-48 left-[-98px] '
          />
        </div>
      </div>
    </section>
  );
}
