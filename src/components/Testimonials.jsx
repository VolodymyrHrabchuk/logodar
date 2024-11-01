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
      "I am very happy with this beauty clinic. They really pamper their customers and give everything with the best",
    author: "REINA DOE",
    title: "Artist / Singer",
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
          className='absolute w-full h-full'
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
      </div>

      {/* Carousel Content */}
      <div className='max-w-7xl mx-auto px-4 pt-32 pb-12 relative'>
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
                className='w-full flex-[0_0_100%] pb-0'
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
