"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const phoneRegex = /^(\+380|0)\d{9}$/; // Example regex for Ukrainian phone numbers

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ім'я повинно містити принаймні 2 символи",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Введіть правильний номер телефону",
  }),
  email: z.string().email({
    message: "Введіть правильну електронну адресу",
  }),
});

export default function ConsultationForm({ isOpen, setIsOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const onSubmit = async (data) => {
    setStatus("Відправка...");
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/submit-form", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setStatus("Дякуємо за Вашу заявку!");
        reset();
        setIsOpen(false);
      } else {
        setStatus("Помилка при відправці форми. Спробуйте ще раз.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Сталася помилка. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
      <div className='bg-orange rounded-lg p-8 max-w-5xl w-full relative z-50 py-16 overflow-hidden'>
        {/* SVG Background */}
        <svg
          width='933'
          height='530'
          viewBox='0 0 933 530'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute top-20 left-20 scale-110 -z-10'
        >
          <path
            d='M805.518 430.009C755.827 499.942 663.503 476.688 623.553 456.32C199.553 308.911 230.405 238.597 87.811 149.357C-90.4309 37.8063 186.342 -2.08935 351.425 48.5403C516.508 99.17 587.574 -70.6218 647.838 128.926C708.101 328.473 867.632 342.593 805.518 430.009Z'
            stroke='white'
            strokeOpacity='0.3'
          />
          <path
            d='M838.369 449.474C784.71 525.016 685.051 499.924 641.929 477.936C184.253 318.835 217.575 242.886 63.6653 146.54C-128.722 26.1062 170.068 -17.0503 348.264 37.5903C526.461 92.2309 603.219 -91.166 668.225 124.336C733.231 339.837 905.443 355.048 838.369 449.474Z'
            stroke='white'
            strokeOpacity='0.3'
          />
          <path
            d='M914.978 473.368C856.714 555.375 748.48 528.118 701.646 504.239C204.582 331.435 240.758 248.983 73.5963 144.356C-135.356 13.5729 189.126 -33.2379 382.658 26.1119C576.189 85.4618 659.523 -113.641 730.152 120.339C800.781 354.319 987.807 370.859 914.978 473.368Z'
            stroke='white'
            strokeOpacity='0.3'
          />
        </svg>

        <h2 className='text-[2.5rem] text-white font-lora mb-4 text-center'>
          Записатися на консультацію
        </h2>
        <p className='text-center font-roboto font-base text-white mb-6'>
          Заповніть форму і ми зв&apos;яжемося з вами для уточнення деталей
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 max-w-md mx-auto flex flex-col items-center'
        >
          <div className='w-full'>
            <input
              {...register("name")}
              placeholder="Ім'я та прізвище"
              aria-label="Ім'я та прізвище"
              className='w-full px-8 py-4 rounded-full'
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div className='w-full'>
            <input
              {...register("phone")}
              placeholder='Номер телефону'
              aria-label='Номер телефону'
              className='w-full px-8 py-4 rounded-full'
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className='w-full'>
            <input
              {...register("email")}
              placeholder='Ваша email адреса'
              aria-label='Ваша email адреса'
              className='w-full px-8 py-4 rounded-full'
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={isSubmitting} // Disable button while submitting
            className={`bg-black text-white py-3 px-12 md:px-10 rounded-full hover:bg-grey transition font-roboto font-normal text-sm md:text-base ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Відправка..." : "Записатися"}
          </button>
        </form>
        {status && (
          <p className='text-center text-sm text-white mt-4'>{status}</p>
        )}
        <p className='text-center text-sm text-[#EBEBEB] font-light mt-4 max-w-64 mx-auto'>
          Заповнюючи форму Ви погоджуєтеся з{" "}
          <a href='#' className='underline'>
            політикою конфіденційності
          </a>
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-5 right-8 text-white hover:text-black transition-colors text-3xl'
          aria-label='Close'
        >
          &times;
        </button>
      </div>
    </div>
  );
}
