import Image from "next/image";
import { ReusableButton } from "./ui/ReusableButton";

export default function ConsultationSection() {
  return (
    <section className='relative w-full overflow-hidden'>
      <div className='mx-auto max-w-[1400px] px-4 py-16 md:pt-0 md:pb-16'>
        <div className='flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between'>
          <div className='hidden md:block relative w-full h-[500px] lg:h-[600px]'>
            <Image
              src='/consult.png'
              alt='Professional consultant'
              fill
              className='object-contain'
              priority
            />
          </div>

          {/* Content */}
          <div className='max-w-[600px] lg:ml-8'>
            <div className='mb-4 relative'>
              <span className='text-sm text-black font-lora'>
                Індивідуальні консультації
              </span>
              <div className='h-[0.19rem] w-[4.5rem] bg-orange absolute -bottom-1 left-0' />
            </div>

            <h2 className='mb-4 md:mb-6 text-2xl md:text-5xl font-lora text-black'>
              Центр «ЛОГОДАР» проводить індивідуальні консультації за
              напрямками:
            </h2>

            <div className='text-grey font-roboto text-sm md:text-base'>
              <ul className="list-disc pl-4">
                <li>Консультування (супервізії для логопедів, психологів)</li>
                <li>
                  Консультування пацієнтів з питань відновлення мови та
                  мовлення, що перенесли інсульт
                </li>
                <li>
                  Консультування пацієнтів з питань відновлення мови та
                  мовлення, що перенесли черепно-мозкові травми
                </li>
                <li>
                  Консультування учасників бойових дій з питань відновлення мови
                  та мовлення, спричинених вибуховою травмою
                </li>
                <li>
                  Консультування батьків з питань поновлення мовлення дитини при
                  заїканні
                </li>
                <li>Консультування пацієнтів з порушенням голосових функцій</li>
              </ul>
            </div>

            <div className='mt-8'>
              <ReusableButton text='Детальніше' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
