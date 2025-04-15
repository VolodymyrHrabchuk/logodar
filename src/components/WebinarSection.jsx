"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ReusableButton } from "./ui/ReusableButton";
import Link from "next/link";
import { getYoutubeThumbnail } from "@/utils/youtube";

export default function WebinarSection() {
  const [carouselApi, setCarouselApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const webinars = [
    {
      id: 1,
      videoUrl: "https://www.youtube.com/watch?v=-6plEHss0ao",
      title: "МОВЛЕННЄВИЙ ЛАБОРАТОРІУМ: ЗИМОВО-РІЗДВЯНИЙ (on-line) 2024 ",
      description:
        "12 українських логопедів-практиків, 7 годин контенту, більше 150 ідей на прикладі досвіду, з використанням власних розробок,  посібників, виробів з дерева, фетру, комп'ютерних ігор. Це все Марафон логопедичних ідей на зимово-Різдвяну тематику. Сертифікат 12 годин (КВЕД 85.59)",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=-6plEHss0ao",
      tag: "Вебінар",
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/watch?v=D2lLR3Gge8Q",
      title: "РОБОТА З ГОЛОСОМ при заїканні (30 практичних кейсів)",
      description:
        "Вебінар-практикум по роботі з голосом при заїканні. 20% теорії, 80% практики. Під час вебінару тренер ділиться власними підходами та напрацюваннями в корекційній роботі при заїканні. Сертифікат 2 години (КВЕД 85.59)",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=D2lLR3Gge8Q",
      tag: "Вебінар",
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/watch?v=GhQNek4_7Hw",
      title: "Вебінар Мовленнєве дихання",
      description:
        "25 дієвих дихальних технік, що допоможуть вдосконалити мовно-мовленнєві компетенції, а також демонструється, при яких порушеннях і як працюють ці техніки. Серед технік, які показано практично, є власні авторські, Є за методикою Стрельникової і ї адаптація для логопедичної роботи.",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=GhQNek4_7Hw",
      tag: "Вебінар",
    },
    {
      id: 4,
      videoUrl: "https://www.youtube.com/watch?v=ziYzLmnsHVE",
      title:
        "Міжнародний конгрес «VOICE and SPEECH тенденції розвитку в XXI столітті» День 1 Частина 1",
      description:
        "16 годин запису дводенного міжнародного конгресу з теми голосу, в якому 17 спікерів-професіоналів (логопеди, лікарі ЛОРи, вокалісти, фоніатри, психологи, актори) діляться своїми напрацюваннями та практичним досвідом при роботі з голосом і голосовим апаратом в цілому при різних порушеннях, а також для постановки голосу у акторів, ведучіх, вокалістів. Сертифікат 17 годин (КВЕД 85.59)",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=ziYzLmnsHVE",
      tag: "Конгрес",
    },
    {
      id: 5,
      videoUrl: "https://www.youtube.com/watch?v=ziYzLmnsHVE",
      title:
        "Міжнародний конгрес «VOICE and SPEECH тенденції розвитку в XXI столітті» День 1 Частина 2",
      description:
        "16 годин запису дводенного міжнародного конгресу з теми голосу, в якому 17 спікерів-професіоналів (логопеди, лікарі ЛОРи, вокалісти, фоніатри, психологи, актори) діляться своїми напрацюваннями та практичним досвідом при роботі з голосом і голосовим апаратом в цілому при різних порушеннях, а також для постановки голосу у акторів, ведучіх, вокалістів. Сертифікат 17 годин (КВЕД 85.59)",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=sO0Wo3qtC2o",
      tag: "Конгрес",
    },
    {
      id: 6,
      videoUrl: "https://www.youtube.com/watch?v=aoC97hhT51I",
      title:
        "Міжнародний конгрес «VOICE and SPEECH тенденції розвитку в XXI столітті» День 2 Частина 1",
      description:
        "16 годин запису дводенного міжнародного конгресу з теми голосу, в якому 17 спікерів-професіоналів (логопеди, лікарі ЛОРи, вокалісти, фоніатри, психологи, актори) діляться своїми напрацюваннями та практичним досвідом при роботі з голосом і голосовим апаратом в цілому при різних порушеннях, а також для постановки голосу у акторів, ведучіх, вокалістів. Сертифікат 17 годин (КВЕД 85.59)",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=aoC97hhT51I",
      tag: "Конгрес",
    },
    {
      id: 7,
      videoUrl: "https://www.youtube.com/watch?v=PyN_xe9NyCk",
      title:
        "Міжнародний конгрес «VOICE and SPEECH тенденції розвитку в XXI столітті» День 2 Частина 2",
      description:
        "16 годин запису дводенного міжнародного конгресу з теми голосу, в якому 17 спікерів-професіоналів (логопеди, лікарі ЛОРи, вокалісти, фоніатри, психологи, актори) діляться своїми напрацюваннями та практичним досвідом при роботі з голосом і голосовим апаратом в цілому при різних порушеннях, а також для постановки голосу у акторів, ведучіх, вокалістів. Сертифікат 17 годин (КВЕД 85.59)",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=PyN_xe9NyCk",
      tag: "Конгрес",
    },
    {
      id: 8,
      videoUrl: "https://www.youtube.com/watch?v=0ybIBBs51pI",
      title:
        "Міжнародна онлайн конференція Голос та мовлення. Від можливостей до реальності",
      description:
        "Перша міжнародна онлайн конференція для логопедів, фахівців творчих професій, лікарів-ЛОРів, фоніатрів, де 100% практики і дієвих методів та підходів при роботі з голосом. 7 спікерів. Сертифікат 17 годин (КВЕД 85.59)",
      isPaid: true,
      url: "https://www.youtube.com/watch?v=0ybIBBs51pI",
      tag: "Конференція",
    },
  ];

  useEffect(() => {
    if (carouselApi) {
      const updateSelected = () =>
        setSelectedIndex(carouselApi.selectedScrollSnap());
      carouselApi.on("select", updateSelected);
      setSelectedIndex(carouselApi.selectedScrollSnap());

      return () => carouselApi.off("select", updateSelected);
    }
  }, [carouselApi]);

  return (
    <div className='max-w-[1400px] w-full mx-auto px-4 py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-4'>
        <div className='lg:col-span-2 relative'>
          <Carousel
            opts={{ loop: true, speed: 300, align: "start" }}
            setApi={setCarouselApi}
            className='w-full'
          >
            <CarouselContent>
              {webinars.map((webinar) => (
                <CarouselItem
                  key={webinar.id}
                  className='basis-full md:basis-1/2'
                >
                  <Card className='border-none shadow-none bg-transparent h-full'>
                    <CardContent className='p-0 h-full flex flex-col justify-between'>
                      <div className='relative overflow-hidden rounded-2xl flex-grow'>
                        <Image
                          src={
                            getYoutubeThumbnail(webinar.videoUrl, "max") ||
                            "/placeholder.svg"
                          }
                          alt={webinar.title}
                          className='w-full h-60 object-cover transition-transform hover:scale-105 rounded-2xl'
                          width={600}
                          height={400}
                          unoptimized
                        />
                        <Badge className='absolute top-4 left-4 bg-orange text-white hover:bg-orange/80 px-6 py-1.5 rounded-full text-xs'>
                          {webinar.tag}
                        </Badge>
                      </div>

                      <div className='mt-6 space-y-4 px-0 md:px-4 flex-grow flex flex-col justify-between'>
                        <div>
                          <h2 className='text-xl md:text-2xl text-black font-lora line-clamp-3'>
                            {webinar.title}
                          </h2>
                          <p className='text-grey text-sm md:text-base pt-2 pb-5 line-clamp-3'>
                            {webinar.description}
                          </p>
                        </div>
                        <Link
                          href={webinar.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <button
                            className='border-2 border-orange text-black hover:bg-orange/20 rounded-md px-4 py-2 text-sm md:text-base font-normal w-full transition'
                            disabled={webinar.isPaid}
                          >
                            {webinar.isPaid
                              ? "Придбати вебінар"
                              : "Переглянути безкоштовно"}
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className='mt-8 flex items-center justify-center gap-8'>
            <button
              onClick={() => carouselApi?.scrollPrev()}
              className='hover:text-orange border-none h-10 w-10 flex items-center justify-center rounded-full bg-transparent'
              aria-label='Previous Slide'
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
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
              {webinars.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === selectedIndex
                      ? "bg-black scale-125"
                      : "bg-black/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => carouselApi?.scrollNext()}
              className='hover:text-orange border-none h-10 w-10 flex items-center justify-center rounded-full bg-transparent'
              aria-label='Next Slide'
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
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

        <div className='space-y-6'>
          <div className='relative'>
            <span className='text-base text-black font-lora'>
              Платні онлайн вебінари
            </span>
            <div className='h-[0.19rem] w-[4.5rem] bg-orange absolute -bottom-1 left-0' />
          </div>

          <h2 className='text-3xl md:text-4xl font-lora text-black'>
            Розвивайте свої навички разом із нами
          </h2>

          <p className='text-grey text-sm md:text-base'>
            Долучайтеся до наших онлайн-вебінарів, де провідні фахівці діляться
            знаннями та досвідом.
          </p>

          <div className='mt-8'>
            <ReusableButton
              text='Переглянути вебінари'
              onClick={() => (window.location.href = "/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
