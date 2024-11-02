import Image from "next/image";
import { ReusableButton } from "./ui/ReusableButton";
export default function TreatmentSection() {
  const treatments = [
    { name: "Facial Treatments", price: 299 },
    { name: "SPA & Massage", price: 129 },
    { name: "Beauty Salon", price: 50 },
    { name: "Manicure & Pedicure", price: 35 },
    { name: "Face Surgery", price: 999 },
  ];

  return (
    <section className='w-full py-12  md:py-16'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='flex flex-col gap-28 lg:flex-row lg:items-center lg:justify-between'>
          {/* Text Content with Treatment List */}
          <div className='flex flex-col space-y-6 md:space-y-12'>
            <h2 className='mb-6 text-2xl md:text-5xl font-lora text-black'>
              Lorem ipsum dolor sit Lorem ipsum dolor
            </h2>

            <div className='grid gap-12'>
              <div className='space-y-8'>
                <div className='flex justify-between'>
                  <h3 className='font-roboto text-sm md:text-base'>
                    TREATMENTS
                  </h3>
                  <h3 className='font-roboto text-sm md:text-base'>
                    START FROM
                  </h3>
                </div>

                <div className='space-y-6'>
                  {treatments.map((treatment) => (
                    <div
                      key={treatment.name}
                      className='flex items-center justify-between'
                    >
                      <span className='w-32 md:w-48 font-roboto text-grey'>
                        {treatment.name}
                      </span>
                      <div className='w-36 md:w-80 h-px bg-white mx-4' />
                      <span className='w-10 md:w-20 font-roboto font-base text-right'>
                        ${treatment.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='pt-4 md:pt-8'>
              <ReusableButton text='Детальніше' />
            </div>
          </div>

          {/* Image Section */}
          <div className='hidden md:block relative aspect-square w-full max-w-xl'>
            <Image
              src='/prices.png'
              alt='Pricing illustration'
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
