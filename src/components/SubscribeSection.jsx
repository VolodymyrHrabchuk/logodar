"use client";
import React, { useState } from "react";
import { ReusableButton } from "./ui/ReusableButton";


const SubscribeSection = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className='max-w-[1400px] w-full mx-auto px-4 mt-64'>
      <div className='flex items-center justify-between'>
        <h2 className='text-[2.5rem] leading-tight text-black mb-6 font-lora w-1/2'>
          Отримуйте новини просто <br />
          на свій email
        </h2>

        <form className='flex items-center justify-center lg:justify-start gap-2 w-1/2'>
          <input
            type='email'
            placeholder={isFocused ? "" : "Введіть свою email адресу"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className='
              appearance-none
              bg-white
              py-3
              px-9
              rounded-full
              w-full
              border-none
              focus:outline-none
              placeholder-gray-400
            '
          />
          <ReusableButton text='Підписатися' />
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
