"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote:
      'Дякую пані Логопед Тетяна Ярмак спікер онлайн конференції автора Алена Щербюк з метою здійснення благодійного проекту Татьяна Курганская підтримки батьків особливих діток! Ваш надихаючий, мотиваційний, артистичний вебінар "Мій шлях до казки" мене окрилив!',
    author: "Анна Полыщук",
    title: "Учасниця онлайн конфереції ",
    image: "/testimonial-avatar.jpg",
  },
  {
    id: 2,
    quote:
      "The staff is very professional and the services are top-notch. Highly recommended!",
    author: "SARAH SMITH",
    title: "Business Owner",
    image: "/testimonial-avatar.jpg",
  },
  {
    id: 3,
    quote:
      "Amazing experience every time. The attention to detail is outstanding",
    author: "EMMA WILSON",
    title: "Fashion Designer",
    image: "/testimonial-avatar.jpg",
  },
];

export default function TestimonialCarousel() {
  const [carouselApi, setCarouselApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  };

  const handlePrevious = () => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  };

  useEffect(() => {
    if (carouselApi) {
      const updateSelected = () => {
        setSelectedIndex(carouselApi.selectedScrollSnap());
      };
      carouselApi.on("select", updateSelected);
      setSelectedIndex(carouselApi.selectedScrollSnap());
      return () => {
        carouselApi.off("select", updateSelected);
      };
    }
  }, [carouselApi]);

  return (
    <div className='relative overflow-hidden bg-[#f86736]'>
      {/* Background SVG */}
      <div className='absolute inset-0 w-full h-full' aria-hidden='true'>
        <svg
          className='hidden md:block absolute w-full h-full'
          viewBox='0 0 1380 549'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1437.07 468.404C1394.13 597.437 1243.4 604.944 1173.4 592.568C462.336 565.466 476.541 444.581 219.036 375.332C-102.845 288.772 298.269 100.104 571.986 100.402C845.703 100.701 874.803 -189.62 1058.58 84.9863C1242.36 359.593 1490.75 307.113 1437.07 468.404Z'
            stroke='white'
            strokeOpacity='0.5'
          />
          <path
            d='M1495.9 482.699C1449.53 622.072 1286.83 630.189 1211.27 616.826C443.742 587.596 459.082 457.025 181.131 382.244C-166.307 288.767 266.673 84.9596 562.128 85.2652C857.583 85.5708 889.012 -228.012 1087.37 68.5845C1285.73 365.181 1553.85 308.482 1495.9 482.699Z'
            stroke='white'
            strokeOpacity='0.5'
          />
          <path
            d='M1568.83 498.066C1518.48 649.375 1341.78 658.181 1259.72 643.671C426.126 611.909 442.782 470.155 140.906 388.96C-236.439 287.465 233.799 66.2178 554.683 66.5603C875.567 66.9028 909.689 -273.536 1125.13 48.4701C1340.57 370.476 1631.76 308.931 1568.83 498.066Z'
            stroke='white'
            strokeOpacity='0.5'
          />
        </svg>
        <svg
          width='393'
          height='371'
          viewBox='0 0 393 371'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute md:hidden w-full h-full'
        >
          <path
            d='M530.39 279.707C507.905 344.176 428.981 347.926 392.33 341.743C20.0185 328.202 27.4564 267.804 -107.373 233.205C-275.91 189.957 -65.8867 95.6928 77.4314 95.8419C220.749 95.9909 235.986 -49.0622 332.213 88.1396C428.44 225.341 558.497 199.121 530.39 279.707Z'
            stroke='white'
            stroke-opacity='0.5'
          />
          <path
            d='M561.19 286.848C536.915 356.484 451.723 360.539 412.161 353.863C10.283 339.258 18.3155 274.021 -127.219 236.658C-309.138 189.954 -82.4297 88.1258 72.2702 88.2784C226.97 88.4311 243.426 -68.2444 347.286 79.9443C451.146 228.133 591.534 199.804 561.19 286.848Z'
            stroke='white'
            stroke-opacity='0.5'
          />
          <path
            d='M599.379 294.524C573.018 370.123 480.493 374.523 437.526 367.273C1.05918 351.404 9.78054 280.579 -148.282 240.011C-345.859 189.301 -99.6427 78.7596 68.3719 78.9307C236.386 79.1019 254.253 -90.9914 367.057 69.8924C479.862 230.776 632.331 200.026 599.379 294.524Z'
            stroke='white'
            stroke-opacity='0.5'
          />
        </svg>
      </div>

      {/* Carousel Content */}
      <div className='max-w-7xl mx-auto px-0 md:px-4 pt-24  md:pt-32 pb-28 md:pb-12 relative'>
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: true,
            align: "center",
          }}
          className='w-full'
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className='w-full flex-[0_0_100%] pb-0 flex items-center justify-center'
              >
                <div className='flex flex-col items-center text-center text-white px-4 md:px-20'>
                  <blockquote className='text-2xl md:text-[2.5rem] leading-snug font-lora mb-12 max-w-4xl'>
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className='flex flex-col items-center'>
                    <div className='w-20 h-20 rounded-full overflow-hidden mb-4 border-1 border-white'>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={80}
                        height={80}
                        className='object-cover'
                      />
                    </div>
                    <div className='font-inter'>
                      <div className='font-roboto font-base uppercase mb-1'>
                        {testimonial.author}
                      </div>
                      <div className='text-white font-roboto font-light '>
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation */}
        <div className='mt-5 flex items-center justify-center gap-4'>
          <button
            onClick={handlePrevious}
            className='p-2 text-white hover:opacity-70 transition-opacity'
            aria-label='Previous testimonial'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.3334 8L2.66675 8M2.66675 8L6.66675 4M2.66675 8L6.66675 12'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <div className='flex gap-2'>
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className='p-2 text-white hover:opacity-70 transition-opacity'
            aria-label='Next testimonial'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.66683 8L13.3335 8M13.3335 8L9.3335 12M13.3335 8L9.3335 4'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
