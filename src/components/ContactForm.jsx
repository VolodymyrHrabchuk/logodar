"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import Link from "next/link";

// Validation Schema
const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Ім'я та прізвище мають містити принаймні 2 символи" }),
  contact: z
    .string()
    .refine(
      (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
        /^\+?[\d\s()-]{10,}$/.test(value),
      {
        message: "Введіть коректний email або номер телефону",
      }
    ),
  message: z
    .string()
    .min(10, { message: "Повідомлення має містити принаймні 10 символів" }),
  // Validate the checkbox is checked
  privacyPolicy: z
    .boolean()
    .refine((val) => val, { message: "Ви маєте погодитися з політикою." }),
});

export const ContactForm = () => {
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();

        // Optional: Auto-hide success message
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        const errorData = await response.json();
        console.error("Form submission error:", errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the visual state
  };

  return (
    <div className='w-full min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4'>
      <div className='w-full max-w-xl mx-auto flex flex-col items-center'>
        {/* Header with orange underline */}
        <div className='text-center mb-6'>
          <h3 className='text-sm md:text-base relative inline-block pb-2'>
            Зв&apos;язок
            <div className='absolute left-1/2 -translate-x-1/2 bottom-0 h-[0.19rem] w-[4.5rem] bg-orange' />
          </h3>
        </div>

        {/* Main title */}
        <h2 className='text-4xl font-serif mb-4 text-center'>
          Зв&apos;яжіться з нами
        </h2>

        {/* Subtitle */}
        <p className='text-grey text-center mb-10 max-w-md'>
          Маєте запитання чи пропозиції? Заповніть форму нижче, і ми
          зв&apos;яжемося з вами якнайшвидше!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-md space-y-6'
        >
          {/* Full Name Input */}
          <div className='space-y-2'>
            <label htmlFor='fullName' className='block text-grey'>
              Ваше Ім&apos;я та Прізвище
            </label>
            <input
              {...register("fullName")}
              id='fullName'
              className='w-full px-4 py-3 rounded-full bg-white border-0 focus:ring-0 focus:outline-none'
              placeholder="Введіть ваше ім'я"
            />
            {errors.fullName && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Contact Input */}
          <div className='space-y-2'>
            <label htmlFor='contact' className='block text-grey'>
              Ваш e-mail або номер телефону
            </label>
            <input
              {...register("contact")}
              id='contact'
              className='w-full px-4 py-3 rounded-full bg-white border-0 focus:ring-0 focus:outline-none'
              placeholder='Email або телефон'
            />
            {errors.contact && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div className='space-y-2'>
            <label htmlFor='message' className='block text-grey'>
              Ваше повідомлення
            </label>
            <textarea
              {...register("message")}
              id='message'
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

          {/* Privacy Policy Checkbox with Framer Motion */}
          <label className='relative justify-center inline-flex items-center cursor-pointer w-full'>
            {/* Hidden Native Checkbox */}
            <input
              type='checkbox'
              className='sr-only'
              {...register("privacyPolicy")}
              checked={isChecked}
              onChange={() => {
                handleCheckboxChange();
              }}
            />
            {/* Fixed size container to prevent layout shifts */}
            <div className='relative w-6 h-6 flex-shrink-0'>
              {/* Custom Box with Framer Motion */}
              <motion.div
                className='absolute w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center'
                animate={{
                  borderColor: isChecked ? "#ff7f00" : "#d1d5db", // Change border color
                }}
                transition={{ duration: 0.2 }} // Adjust animation duration
              >
                {/* Show Checkmark when checked */}
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
            </div>
            <span className='ml-3 text-sm text-grey'>
              Я погоджуюся з{" "}
              <Link href='/privacy-policy'>
                Політикою конфіденційності Логодар
              </Link>
              .
            </span>
          </label>

          {/* Submit Button */}
          <div className='pt-4 flex justify-center'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-12 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50'
            >
              {isSubmitting ? "Надсилання..." : "Надіслати"}
            </button>
          </div>

          {/* Submission Status Messages */}
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
