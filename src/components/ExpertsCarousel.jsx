"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { webIcon } from "./ui/Icons";
import SocialButton from "./ui/ReusableButton";

const experts = [
  {
    id: 1,
    name: "Міністерство освіти та науки України",
    title: "",
    image: "/mon.jpg",
    url: "https://mon.gov.ua/",
  },
  {
    id: 2,
    name: "Житомирський державний університет імені Івана Франка",
    title: "",
    image: "/university-1.png",
    url: "https://zu.edu.ua/",
  },
  {
    id: 3,
    name: "Tренінговий центр ”СУТО”",
    title: "",
    image: "/suto.jpg",
    url: "https://www.suto-tc.com/",
  },
  {
    id: 4,
    name: "Київський столичний університет імені Бориса Грінченка",
    title: "",
    image: "/university-2.png",
    url: "https://kubg.edu.ua/",
  },
  {
    id: 5,
    name: "Громадська організація «Територія розвитку»",
    title: "",
    image: "/university-3.jpg",
    url: "https://www.facebook.com/groups/toriyarozvytku",
  },
  {
    id: 6,
    name: "Компанія “ЛОГОЗОН”",
    title: "",
    image: "/university-4.jpg",
    url: "https://logozon.org.ua/",
  },
  {
    id: 7,
    name: "Департамент освіти Львівської обласної адміністрації",
    title: "",
    image: "/university-5.jpg",
    url: "https://osvita.loda.gov.ua/",
  },
  {
    id: 8,
    name: "Львівський обласний інститут післядипломної педагогічної освіти",
    title: "",
    image: "/university-6.jpg",
    url: "https://loippo.lviv.ua/",
  },
  {
    id: 9,
    name: "Департамент освіти Івано-Франківської обласної адміністрації",
    title: "",
    image: "/university-7.jpg",
    url: "https://www.if.gov.ua/struktura/departament-osviti-nauki-ta-molodizhnoyi-politiki",
  },
];

export default function ExpertsCarousel() {
  const [carouselApi, setCarouselApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // обновляем selectedIndex при любой прокрутке
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setSelectedIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    setSelectedIndex(carouselApi.selectedScrollSnap());
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // автопрокрутка по одной карточке каждые 8 секунд
  useEffect(() => {
    if (!carouselApi) return;
    const id = setInterval(() => {
      carouselApi.scrollNext();
    }, 8000);
    return () => clearInterval(id);
  }, [carouselApi]);

  return (
    <div className='max-w-7xl mx-auto px-4 py-16 text-center relative overflow-visible'>
      <div className='hidden md:block absolute left-0 bottom-0 w-[800px] h-[800px] -translate-x-1/3 translate-y-1/2 bg-orange rounded-full blur-[100px] opacity-10 z-0' />

      <div className='space-y-4 md:space-y-6 mb-16'>
        <h3 className='text-sm md:text-base relative inline-block pb-2'>
          Співпраця
          <div className='absolute left-1/2 -translate-x-1/2 bottom-0 h-[0.19rem] w-[4.5rem] bg-orange' />
        </h3>
        <h2 className='text-2xl md:text-5xl font-lora'>
          З ким ми співпрацюємо?
        </h2>
        <p className='text-grey max-w-2xl mx-auto text-sm md:text-base font-roboto'>
          Ось декілька інституцій з якими ми співпрацюємо:
        </p>
      </div>

      <div className='py-1 md:py-4'>
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: true,
            align: "center",
          }}
          className='w-full h-full'
        >
          <CarouselContent className='px-4'>
            {experts.map((expert, index) => (
              <CarouselItem
                key={expert.id}
                className='basis-full flex-shrink-0 md:basis-1/3 lg:basis-1/3 flex flex-col items-center'
              >
                <div
                  className={`pt-4 px-5 pb-10 my-2 rounded-t-full transition-all ${
                    index === selectedIndex ? "ring-2 ring-white" : ""
                  } mx-2 flex flex-col justify-between h-full`}
                >
                  <div className='relative rounded-full overflow-hidden mb-6 w-[260px] h-[260px] mx-auto ring-1 ring-gray-100'>
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='object-cover'
                    />
                  </div>
                  <div className='flex flex-col flex-grow items-center justify-center'>
                    <h3 className='text-base font-inter mb-2 max-w-52 w-full mx-auto text-center'>
                      {expert.name}
                    </h3>
                    <p className='text-grey text-base font-inter mb-5 text-center'>
                      {expert.title}
                    </p>
                  </div>
                  <SocialButton
                    icon={webIcon}
                    key={expert.id}
                    url={expert.url}
                    className='justify-center'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className='mt-8 flex items-center justify-center gap-4'>
        <button
          onClick={() => carouselApi?.scrollPrev()}
          className='p-2 hover:bg-orange-50 transition-colors'
          aria-label='Previous Slide'
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
              stroke='#1E1E1E'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <div className='flex gap-2'>
          {experts.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === selectedIndex ? "bg-black scale-125" : "bg-black/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => carouselApi?.scrollNext()}
          className='p-2 hover:bg-orange-50 transition-colors'
          aria-label='Next Slide'
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
              stroke='#1E1E1E'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
