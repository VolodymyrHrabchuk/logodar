// components/TelegramSubscribe.jsx
import Link from "next/link";
import { TelegramIcon } from "./ui/Icons";

export default function TelegramSubscribe() {
  return (
    <div className='max-w-5xl w-full py-12 px-4 relative z-10'>
      <div className=' mx-auto flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-4'>
        {/* Заголовок */}
        <h2 className='text-2xl sm:text-3xl max-w-[540px] font-normal font-lora text-black relative z-10'>
          Слідкуйте за новинами та анонсами в нашому Телеграм-каналі
        </h2>

        {/* Кнопка */}
        <Link href='https://t.me/c/2271131268/625' passHref>
          <button className='mt-6 md:mt-0 inline-flex items-center px-10 py-2 bg-black text-white text-base rounded-full hover:bg-gray-800 transition'>
            <TelegramIcon />
            <span className='ml-3 font-normal'>Підписатись</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
