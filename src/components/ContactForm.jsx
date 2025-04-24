"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import TelegramSubscribe from "./TelegramSubscribe";

// 1. Validation schema
const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Ім'я та прізвище мають містити принаймні 2 символи" }),
  contact: z
    .string()
    .refine(
      (v) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ||
        /^\+?[\d\s()-]{10,}$/.test(v),
      { message: "Введіть коректний email або номер телефону" }
    ),
  message: z.string().min(10, {
    message: "Повідомлення має містити принаймні 10 символів",
  }),
  privacyPolicy: z.boolean().refine((v) => v, {
    message: "Ви маєте погодитися з політикою.",
  }),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  // 2. Toggle handler
  const handleCheckboxChange = () => setIsChecked((prev) => !prev);

  // 3. Submit handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error();
      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 relative overflow-clip'>
      <div className='absolute top-[10px] md:-top-[60px] right-[20px] md:right-[100px] w-[320px] h-[320px] md:w-[420px] md:h-[420px] bg-[#eecbbe8d] rounded-full blur-3xl'></div>
      <TelegramSubscribe />
      <div className='w-full max-w-xl mx-auto flex flex-col items-center'>
        {/* Header */}
        <div className='text-center mb-6'>
          <h3 className='text-sm md:text-base relative inline-block pb-2'>
            Зв&apos;язок
            <div className='absolute left-1/2 -translate-x-1/2 bottom-0 h-[0.19rem] w-[4.5rem] bg-orange' />
          </h3>
        </div>
        <h2 className='text-4xl font-serif mb-4 text-center relative z-10'>
          Зв&apos;яжіться з нами
        </h2>
        <p className='text-grey text-center mb-10 max-w-md relative z-10'>
          Маєте запитання чи пропозиції? Заповніть форму нижче, і ми
          зв&apos;яжемося з вами якнайшвидше!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-md space-y-6'
        >
          {/* Full Name */}
          <div className='space-y-2'>
            <label htmlFor='fullName' className='block text-grey'>
              Ваше Ім&apos;я та Прізвище
            </label>
            <input
              {...register("fullName")}
              id='fullName'
              aria-label="Ваше ім'я та прізвище"
              className='w-full px-4 py-3 rounded-full bg-white border-0 focus:ring-0 focus:outline-none'
              placeholder="Введіть ваше ім'я"
            />
            {errors.fullName && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className='space-y-2'>
            <label htmlFor='contact' className='block text-grey'>
              Ваш e-mail або номер телефону
            </label>
            <input
              {...register("contact")}
              id='contact'
              aria-label='Email або телефон'
              className='w-full px-4 py-3 rounded-full bg-white border-0 focus:ring-0 focus:outline-none'
              placeholder='Email або телефон'
            />
            {errors.contact && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className='space-y-2'>
            <label htmlFor='message' className='block text-grey'>
              Ваше повідомлення
            </label>
            <textarea
              {...register("message")}
              id='message'
              aria-label='Ваше повідомлення'
              rows={6}
              className='w-full px-4 py-3 rounded-3xl bg-white border-0 focus:ring-0 focus:outline-none resize-none'
              placeholder='Введіть ваше повідомлення'
            />
            {errors.message && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Privacy Policy */}
          <div className='flex items-center space-x-3'>
            {/* Hidden checkbox for form registration */}
            <input
              type='checkbox'
              {...register("privacyPolicy")}
              checked={isChecked}
              readOnly
              className='sr-only'
            />

            {/* Only this box is clickable */}
            <motion.div
              role='checkbox'
              aria-checked={isChecked}
              tabIndex={0}
              onClick={handleCheckboxChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCheckboxChange();
              }}
              className='w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer'
              animate={{ borderColor: isChecked ? "#ff7f00" : "#d1d5db" }}
              transition={{ duration: 0.2 }}
            >
              {isChecked && (
                <svg
                  className='w-5 h-5 text-orange'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M5 13l4 4L19 7' />
                </svg>
              )}
            </motion.div>

            {/* Plain text label; not clickable */}
            <span className='text-sm text-grey'>
              Я погоджуюся з{" "}
              <Link
                href='/privacy-policy'
                aria-label='Політика конфіденційності'
              >
                Політикою конфіденційності Логодар
              </Link>
              .
            </span>
          </div>
          {errors.privacyPolicy && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.privacyPolicy.message}
            </p>
          )}

          {/* Submit */}
          <div className='pt-4 flex justify-center'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-12 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50'
            >
              {isSubmitting ? "Надсилання..." : "Надіслати"}
            </button>
          </div>

          {submitStatus === "success" && (
            <p className='text-green-500 text-center mt-4'>
              Повідомлення успішно надіслано!
            </p>
          )}
          {submitStatus === "error" && (
            <p className='text-red-500 text-center mt-4'>
              Виникла помилка. Спробуйте пізніше.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
