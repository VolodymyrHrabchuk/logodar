import Image from "next/image";
import { ReusableButton } from "./ui/ReusableButton";
export default function TreatmentSection() {
  const treatments = [
    { name: "Індивідуальна консультація логопеда", price: "1000 грн" },
    { name: "Індивідуальна консультація психолога", price: "1000 грн" },
    {
      name: "Абонемент на корекційно-відновлювальні послуги",
      price: "1000 грн",
    },
    {
      name: "Індивідуальна консультація для учасників бойових дій",
      price: "Безкоштовно",
    },
    { name: "Вебінар", price: "5000 грн" },
    { name: "Навчальні курси", price: "2500 грн" },
  ];

  return (
    <section className='w-full py-12  md:py-16'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='flex flex-col gap-28 lg:flex-row lg:items-center lg:justify-between'>
          {/* Text Content with Treatment List */}
          <div className='flex flex-col space-y-6 md:space-y-12'>
            <h2 className='mb-6 text-2xl md:text-5xl font-lora text-black whitespace-nowrap'>
              Прайс лист (Вартість послуг):{" "}
            </h2>

            <div className='grid gap-12'>
              <div className='space-y-8'>
                <div className='flex justify-between'>
                  <h3 className='font-roboto text-sm md:text-base'>Послуга</h3>
                  <h3 className='font-roboto text-sm md:text-base'>Ціна від</h3>
                </div>

                <div className='space-y-6'>
                  {treatments.map((treatment, index) => (
                    <div
                      key={treatment.name}
                      className='flex items-center justify-between w-full'
                    >
                      <div
                        key={index}
                        className='flex items-center justify-between py-2 w-full'
                      >
                        <span className='text-sm md:text-base text-grey'>
                          {treatment.name}
                        </span>
                        <div className='flex-grow border-b border-dotted border-gray-300 mx-4' />
                        <span className='text-sm  md:text-base '>
                          {treatment.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className=''>
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
