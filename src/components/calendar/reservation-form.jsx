"use client";

import { useState } from "react";
import { ReusableButton } from "../ui/ReusableButton";

export default function ReservationForm({ event, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setDebugInfo(null);

    const payload = {
      eventId: event.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
    };

    try {
      console.log("Submitting payload:", payload);
      const response = await fetch("/api/register-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);
      setDebugInfo(
        `Status: ${response.status}, Response: ${responseText.substring(
          0,
          100
        )}...`
      );

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(
          `Failed to parse response as JSON: ${responseText.substring(
            0,
            100
          )}...`
        );
      }

      if (!data.success) {
        throw new Error(data.message || "Помилка при бронюванні");
      }

      onSuccess();
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto mt-4 p-4 sm:p-6 md:p-8 rounded-3xl border border-white'>
      <h3 className='text-2xl sm:text-3xl font-serif mb-4 text-center'>
        Зареєструватися на подію
      </h3>
      <h4 className='text-lg sm:text-xl mb-6 text-center'>{event.title}</h4>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Инпут "Ім'я" */}
        <div className='space-y-2'>
          <label htmlFor='name' className='block text-grey'>
            Ім&apos;я
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full px-4 py-3 rounded-full bg-white border-0 focus:ring-0 focus:outline-none'
          />
        </div>

        {/* Инпут "Email" */}
        <div className='space-y-2'>
          <label htmlFor='email' className='block text-grey'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full px-4 py-3 rounded-full bg-white border-0 focus:ring-0 focus:outline-none'
          />
        </div>

        {/* Инпут "Телефон" */}
        <div className='space-y-2'>
          <label htmlFor='phone' className='block text-grey'>
            Телефон
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='w-full px-4 py-3 rounded-full bg-white border-0 focus:ring-0 focus:outline-none'
          />
        </div>

        {/* Текстовое поле "Примітки" */}
        <div className='space-y-2'>
          <label htmlFor='notes' className='block text-grey'>
            Примітки
          </label>
          <textarea
            id='notes'
            name='notes'
            value={formData.notes}
            onChange={handleChange}
            rows='3'
            className='w-full px-4 py-3 rounded-3xl bg-white border-0 focus:ring-0 focus:outline-none resize-none'
          />
        </div>

        {/* Кнопки */}
        <div className='pt-4 flex gap-4 justify-center'>
          <button
            type='button'
            onClick={onCancel}
            className='px-12 py-3 bg-transparent border border-orange text-orange rounded-full hover:bg-orange hover:text-white transition-colors duration-300'
          >
            Скасувати
          </button>
          <ReusableButton
            text={isSubmitting ? "Обробка..." : "Підтвердити"}
            type='submit'
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
