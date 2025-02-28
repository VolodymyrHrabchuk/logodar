"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReusableButton } from "./ui/ReusableButton";

// Mock events data - replace with your actual data source
const EVENTS = {
  "2025-02-28": {
    hasEvent: true,
    title: "Подія 28 лютого",
    description: "Опис події на 28 лютого 2025 року",
  },
  "2025-03-15": {
    hasEvent: true,
    title: "Подія 15 березня",
    description: "Опис події на 15 березня 2025 року",
  },
};

export default function CalendarEvents() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Ukrainian month names
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

  // Ukrainian day names
  const ukrainianDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const getEventStatus = (date) => {
    const dateKey = formatDateKey(date);
    return EVENTS[dateKey] || { hasEvent: false };
  };

  const handleDateClick = (date) => {
    const dateKey = formatDateKey(date);
    if (EVENTS[dateKey]) {
      setSelectedDate((prevDate) => (prevDate === dateKey ? null : dateKey));
    } else {
      setSelectedDate(null);
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);

    const days = [];

    // Get the Monday before the first day of the month
    const start = new Date(firstDay);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));

    // Generate 42 days (6 weeks)
    while (days.length < 42) {
      days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }

    return days;
  };

  const days = generateCalendarDays();
  // Calculate the correct indices for corner cells
  const topLeftIndex = 0;
  const topRightIndex = 6;
  const bottomLeftIndex = 35; // For 6 rows (actually last row starts at index 35)
  const bottomRightIndex = 41; // For 6 rows (actually last cell is at index 41)

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 lg:p-8'>
      {/* Main container - flex column on mobile, row on desktop */}
      <div className='flex flex-col lg:flex-row lg:gap-12 xl:gap-16'>
        {/* Calendar Section - full width on mobile, constrained on desktop */}
        <div className='w-full lg:w-3/5'>
          <div className='flex justify-between items-center mb-4 md:mb-6 lg:mb-8'>
            {/* Animate only the month name */}
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
            {/* Chevrons remain unanimated */}
            <div className='flex gap-4 md:gap-6 lg:gap-8'>
              <button
                onClick={prevMonth}
                className='text-xl md:text-2xl text-black hover:text-gray-600'
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextMonth}
                className='text-xl md:text-2xl text-black hover:text-gray-600'
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div>
            {/* Day headers */}
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

            {/* Calendar grid with rounded corners */}
            <div className='overflow-hidden rounded-3xl border border-white'>
              <div className='grid grid-cols-7'>
                {days.map((date, index) => {
                  const dateKey = formatDateKey(date);
                  const { hasEvent } = getEventStatus(date);
                  const isCurrentMonth =
                    date.getMonth() === currentDate.getMonth();
                  const isSelected = dateKey === selectedDate;

                  // Determine if this cell is one of the corner cells
                  const isTopLeft = index === topLeftIndex;
                  const isTopRight = index === topRightIndex;
                  const isBottomLeft = index === bottomLeftIndex;
                  const isBottomRight = index === bottomRightIndex;

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
                    >
                      <span className='text-sm md:text-base lg:text-lg xl:text-xl'>
                        {date.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Events Section - Below calendar on mobile, beside on desktop */}
        <div className='w-full lg:w-2/5 mt-12 lg:mt-0'>
          <div className='mb-2'>
            <h3 className='text-lg text-black text-center md:text-left mb-1'>
              Календар актуальних подій
            </h3>
            <div className='w-16 h-0.5 bg-orange mx-auto md:mx-0'></div>
          </div>

          <h2 className='text-3xl md:text-[2.5rem] text-center md:text-left font-lora text-black mb-4 md:mb-6 mt-4 md:mt-7'>
            Актуальні події
          </h2>

          <AnimatePresence mode='wait'>
            {selectedDate && EVENTS[selectedDate] ? (
              <motion.div
                key={selectedDate}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='space-y-4 text-center md:text-left'
              >
                <h4 className='text-xl text-black'>
                  {EVENTS[selectedDate].title}
                </h4>
                <p className='text-gray-600'>
                  {EVENTS[selectedDate].description}
                </p>
                <div className='pt-2'>
                  <ReusableButton text='Зареєструватися' />
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
                  зареєструватися, натиснувши кнопку &#34;Зареєструватися&#34;.
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
      </div>
    </div>
  );
}
