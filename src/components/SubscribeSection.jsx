"use client";
import React, { useState } from "react";
import { ReusableButton } from "./ui/ReusableButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

// Define the schema using Zod for validation
const emailSchema = z.object({
  email: z.string().email({ message: "Введіть правильну електронну адресу" }),
});

const SubscribeSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setStatus("Відправка...");
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/subscribe", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setStatus("Дякуємо за підписку!");
        reset();
      } else {
        setStatus("Помилка при відправці форми. Спробуйте ще раз.");
      }
    } catch (error) {
      console.error("Error submitting subscription:", error);
      setStatus("Сталася помилка. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='hidden md:block max-w-[1400px] w-full mx-auto px-4 my-32'>
      <div className='flex items-center justify-between'>
        <h2 className='text-[2.5rem] leading-tight text-black mb-6 font-lora w-1/2'>
          Отримуйте новини просто <br />
          на свій email
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex items-start  justify-center lg:justify-start gap-2 w-1/2'
        >
          <div className='w-full flex flex-col items-start'>
            <input
              type='email'
              placeholder='Введіть свою email адресу'
              {...register("email")}
              aria-label='Ваша email адреса'
              className='
                appearance-none
                bg-white
                py-3
                px-9
                rounded-full
                w-full
                border border-gray-300
                focus:outline-none
                placeholder-gray-400
              '
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className='text-red-500 text-sm pt-2 pl-4'>
                {errors.email.message}
              </p>
            )}
          </div>
          <ReusableButton
            text={isSubmitting ? "Відправка..." : "Підписатися"}
            disabled={isSubmitting}
          />
        </form>
      </div>
      {status && (
        <p className='text-center text-md text-green-600 mt-4'>{status}</p>
      )}
    </section>
  );
};

export default SubscribeSection;
