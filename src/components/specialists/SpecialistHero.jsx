import Image from "next/image";

export default function SpecialistsHero() {
  return (
    <div className='relative w-full  mt-40'>
      <div className='mx-auto max-w-[1400px] px-4 py-20 md:pt-0 md:pb-16'>
        <div className='flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between'>
          <div className='hidden md:flex relative w-full h-[500px] justify-center items-end  gap-10'>
            <div className='relative w-[275px] h-[520px] rounded-[300px] overflow-hidden'>
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

            <div className='relative w-[220px] h-[365px] rounded-[300px] overflow-hidden'>
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
          <div className='max-w-[600px] lg:ml-8'>
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
