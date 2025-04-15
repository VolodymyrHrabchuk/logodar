"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ReusableButton } from "../ui/ReusableButton";
import ReservationForm from "./reservation-form";
import { formatDateKey } from "@/lib/dateHelpers";

export default function CalendarEvents() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  // Ukrainian month and day names
  const ukrainianMonths = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  const ukrainianDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

  // Fetch events when month changes
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const response = await fetch(
          `/api/calendar-events?year=${year}&month=${month}`
        );
        if (!response.ok) {
          throw new Error("Помилка при отриманні подій");
        }
        const data = await response.json();
        setEvents(data.events || {});
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Не вдалося завантажити події. Спробуйте пізніше.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [currentDate]);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
    setShowReservationForm(false);
    setReservationSuccess(false);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setShowReservationForm(false);
    setReservationSuccess(false);
  };

  const getEventStatus = (date) => {
    const dateKey = formatDateKey(date);
    return events[dateKey] || { hasEvent: false };
  };

  const handleDateClick = (date) => {
    const dateKey = formatDateKey(date);
    if (events[dateKey]) {
      setSelectedDate((prevDate) => (prevDate === dateKey ? null : dateKey));
      setShowReservationForm(false);
      setReservationSuccess(false);
    } else {
      setSelectedDate(null);
      setShowReservationForm(false);
      setReservationSuccess(false);
    }
  };

  const handleReservationClick = () => {
    setShowReservationForm(true);
  };

  const handleReservationSuccess = () => {
    setShowReservationForm(false);
    setReservationSuccess(true);
  };

  const handleReservationCancel = () => {
    setShowReservationForm(false);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const days = [];
    // Получаем понедельник перед первым днём месяца
    const start = new Date(firstDay);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    while (days.length < 42) {
      days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return days;
  };

  const days = generateCalendarDays();
  const topLeftIndex = 0;
  const topRightIndex = 6;
  const bottomLeftIndex = 35;
  const bottomRightIndex = 41;

  const formatEventDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()} ${
      ukrainianMonths[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 lg:p-8'>
      {/* Основной контейнер: на мобильных устройствах - колоночный порядок,
          на десктопе - ряд с двумя секциями */}
      <div className='flex flex-col lg:flex-row lg:gap-12 xl:gap-16'>
        <div className='mb-6  sm:hidden'>
          <h3 className='text-lg text-black text-center md:text-left mb-1'>
            Календар актуальних подій
          </h3>
          <div className='w-16 h-0.5 bg-orange mx-auto md:mx-0'></div>
        </div>
        {/* Секция актуальных событий: на мобильных - сверху, на десктопе - справа */}
        <div className='w-full lg:w-2/5 mt-12 lg:mt-0 order-last'>
          <div className='mb-2 hidden sm:block'>
            <h3 className='text-lg text-black text-center md:text-left mb-1'>
              Календар актуальних подій
            </h3>
            <div className='w-16 h-0.5 bg-orange mx-auto md:mx-0'></div>
          </div>

          <h2 className='text-3xl md:text-[2.5rem] text-center md:text-left font-lora text-black mb-4 md:mb-6 mt-4 md:mt-7'>
            Актуальні події
          </h2>

          <AnimatePresence mode='wait'>
            {showReservationForm && selectedDate && events[selectedDate] ? (
              <motion.div
                key='reservation-form'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Передаём событие без списка гостей */}
                <ReservationForm
                  event={{ ...events[selectedDate], attendees: [] }}
                  onSuccess={handleReservationSuccess}
                  onCancel={handleReservationCancel}
                />
              </motion.div>
            ) : reservationSuccess ? (
              <motion.div
                key='success'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='p-4 bg-green-50 text-green-700 rounded-md'
              >
                <h4 className='text-lg font-medium mb-2'>
                  Бронювання успішно створено!
                </h4>
                <p>
                  Дякуємо за вашу реєстрацію. Ми надіслали деталі на вашу
                  електронну пошту.
                </p>
              </motion.div>
            ) : selectedDate && events[selectedDate] ? (
              <motion.div
                key={selectedDate}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='space-y-4 text-center md:text-left'
              >
                <h4 className='text-xl text-black font-medium'>
                  {events[selectedDate].title}
                </h4>
                <div className='text-sm text-gray-600'>
                  <p>Дата: {formatEventDate(events[selectedDate].start)}</p>
                  {events[selectedDate].location && (
                    <p className='mt-1'>
                      Місце: {events[selectedDate].location}
                    </p>
                  )}
                </div>
                <p className='text-gray-600 mt-2'>
                  {events[selectedDate].description}
                </p>
                <div className='pt-2'>
                  <ReusableButton
                    text='Зареєструватися'
                    onClick={handleReservationClick}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='no-event'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className='text-gray-600 mb-8 text-center md:text-left'>
                  Оберіть дату, щоб отримати короткий опис подій, запланованих
                  на цей день. Якщо подія зацікавила вас, ви можете
                  зареєструватися, натиснувши кнопку
                  &quot;Зареєструватися&quot;.
                </p>
                <ReusableButton
                  text='Зареєструватися'
                  disabled
                  className='mx-auto md:mx-0 block'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Секция календаря */}
        <div className='w-full lg:w-3/5'>
          <div className='flex justify-between items-center mb-4 md:mb-6 lg:mb-8'>
            <AnimatePresence mode='wait'>
              <motion.h2
                key={currentDate.toString()}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className='text-2xl md:text-3xl font-judson text-black'
              >
                {ukrainianMonths[currentDate.getMonth()]}{" "}
                {currentDate.getFullYear()} року
              </motion.h2>
            </AnimatePresence>
            <div className='flex gap-4 md:gap-6 lg:gap-8'>
              <button
                onClick={prevMonth}
                className='text-xl md:text-2xl text-black hover:text-gray-600'
                aria-label='Попередній місяць'
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextMonth}
                className='text-xl md:text-2xl text-black hover:text-gray-600'
                aria-label='Наступний місяць'
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div>
            <div className='grid grid-cols-7'>
              {ukrainianDays.map((day) => (
                <div
                  key={day}
                  className='py-2 md:py-3 lg:py-4 text-center text-black text-sm md:text-base'
                >
                  {day}
                </div>
              ))}
            </div>

            <div className='overflow-hidden rounded-3xl border border-white'>
              <div className='grid grid-cols-7'>
                {days.map((date, index) => {
                  const dateKey = formatDateKey(date);
                  const { hasEvent } = getEventStatus(date);
                  const isCurrentMonth =
                    date.getMonth() === currentDate.getMonth();
                  const isSelected = dateKey === selectedDate;
                  const isTopLeft = index === 0;
                  const isTopRight = index === 6;
                  const isBottomLeft = index === 35;
                  const isBottomRight = index === 41;

                  return (
                    <div
                      key={index}
                      onClick={() => isCurrentMonth && handleDateClick(date)}
                      className={`
                        relative py-2 md:py-3 lg:py-4 xl:py-5 text-center cursor-pointer
                        ${
                          !isCurrentMonth
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black"
                        }
                        ${hasEvent && !isSelected ? "bg-orange/50" : ""}
                        ${isSelected && hasEvent ? "bg-orange text-white" : ""}
                        ${isCurrentMonth && !hasEvent ? "hover:bg-white" : ""}
                        ${index % 7 !== 0 ? "border-l border-white" : ""}
                        ${index < 7 ? "" : "border-t border-white"}
                        ${isTopLeft ? "rounded-tl-3xl" : ""}
                        ${isTopRight ? "rounded-tr-3xl" : ""}
                        ${isBottomLeft ? "rounded-bl-3xl" : ""}
                        ${isBottomRight ? "rounded-br-3xl" : ""}
                        transition-colors duration-200
                      `}
                      aria-selected={isSelected}
                      aria-label={`${date.getDate()} ${
                        ukrainianMonths[date.getMonth()]
                      } ${date.getFullYear()}`}
                    >
                      <span className='text-sm md:text-base lg:text-lg xl:text-xl'>
                        {date.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {isLoading && (
              <div className='flex justify-center items-center mt-4'>
                <Loader2 className='w-6 h-6 animate-spin text-orange' />
                <span className='ml-2'>Завантаження подій...</span>
              </div>
            )}

            {error && (
              <div className='mt-4 p-3 bg-red-50 text-red-700 rounded-md'>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
