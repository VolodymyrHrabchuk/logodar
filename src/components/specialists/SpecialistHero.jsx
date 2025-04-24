import Image from "next/image";

export default function SpecialistsHero() {
  return (
    <div className='relative w-full mt-20 md:mt-40'>
      <div className='mx-auto max-w-[1400px] px-4 py-10 md:py-20 md:pt-0 md:pb-16'>
        <div className='flex flex-col-reverse items-center gap-8 md:gap-12 lg:flex-row lg:items-center lg:justify-between'>
          {/* Images - Now visible on mobile */}
          <div className='flex relative w-full h-[300px] md:h-[500px] justify-center items-end gap-4 md:gap-10 order-2 lg:order-1'>
            <div className='relative w-[165px] h-[320px] md:w-[275px] md:h-[520px] rounded-[300px] overflow-hidden'>
              <Image
                src='/doc-hero-1.webp'
                alt='Medical consultation scene'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
                priority
              />
              <div className='absolute inset-0 bg-orange opacity-5'></div>
            </div>

            <div className='relative w-[130px] h-[220px] md:w-[220px] md:h-[365px] rounded-[300px] overflow-hidden'>
              <Image
                src='/doc-hero-2.webp'
                alt='Consultation participant'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
                priority
              />
              <div className='absolute inset-0 bg-orange opacity-5'></div>
            </div>
          </div>

          {/* Content */}
          <div className='max-w-[600px] lg:ml-8 order-1 lg:order-2'>
            <div className='mb-4 relative'>
              <span className='text-sm text-black font-lora'>Спеціалісти </span>
              <div className='h-[0.19rem] w-[4.5rem] bg-orange absolute -bottom-1 left-0' />
            </div>

            <h2 className='mb-4 md:mb-6 text-2xl md:text-5xl font-lora text-black'>
              Спеціалісти що співпрацюють з нами
            </h2>

            <div className='text-grey font-roboto text-sm md:text-base'>
              <p>
                Професіонали, яким можна довіряти. Наші спеціалісти мають
                глибокий досвід та експертизу у своїй сфері, щоб допомогти вам
                знайти найкраще рішення. Обирайте найкращих – обирайте
                впевненість!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
