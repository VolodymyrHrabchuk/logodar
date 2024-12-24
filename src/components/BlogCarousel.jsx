// BlogCarousel.js
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

export default function BlogCarousel() {
  // State to store the Carousel API
  const [carouselApi, setCarouselApi] = useState(null);
  // State to track the currently active slide
  const [selectedIndex, setSelectedIndex] = useState(0);

  const posts = [
    {
      id: 1,
      image: "/swiper-1.jpg",
      title: "Логопед про те, як заговорити знову після інсульту",
      description:
        "Логопед – Тетяна Ярмак пояснює роль логопеда у реабілітації, типи мовленнєвих патологій, причини їх виникнення, а також методи та підходи до відновлення мовленн...",
      url: "https://www.youtube.com/watch?v=CAu0oAJP9NE&ab_channel=RadioM",
      tag: "Подкаст",
    },
    {
      id: 2,
      image: "/swiper-2.jpg",
      title: "Чи допоможе логопед знову заговорити?",
      description:
        "У цьому епізоді 'Майстерні' ми зустрічаємося з Тетяною Ярмак, експертом-логопедом, щоб обговорити широкий спектр питань мовленнєвого розвитку. Від розкриття впливу оточен...",
      url: "https://www.youtube.com/watch?v=1ogr9OmzHfc&ab_channel=RadioM",
      tag: "Подкаст",
    },
    {
      id: 3,
      image: "/swiper-3.jpg",
      title:
        "Логопединя неврологічного відділення Львівської обласної клінічної лікарні, засновниця освітньо-тренінгового Центру 'Логодар' Тетяна Ярмак.",
      description: "",
      url: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=233962409567972",
      tag: "Подкаст",
    },
    {
      id: 4,
      image: "/swiper-4.jpg",
      title: "Інтерактивний логопедичний тренінг в Івано-Франківську",
      description:
        "Зачарувати голосом. Правильна вимова в дитини, відповідна інтонація - мрія кожної мами. Логопед - одна із найпопулярніших професій сучасності. Прикарпатські фахівці зібралися на темат... ",
      url: "https://www.youtube.com/watch?v=5YlAe5xF9ds&ab_channel=%D0%A2%D0%B5%D0%BB%D0%B5%D1%80%D0%B0%D0%B4%D1%96%D0%BE%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D1%96%D1%8F%D0%92%D0%95%D0%96%D0%90",
      tag: "Репортаж",
    },
    {
      id: 5,
      image: "/swiper-5.jpg",
      title: "Тетяна Ярмак. Порушення мовлення та поради від логопеда",
      description:
        "Побільшало фобій та мовленнєвих затримок, додалася тривожність. Так велика війна вплинула на багатьох дітей і дорослих. Дитячі психологи та педагоги-дефектологи в од... ",
      url: "https://soundcloud.com/user-2462259/logoped-21-12-2023?si=9558e0af9d4a483cbb0c08c298dc549b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      tag: "Стрім",
    },
    {
      id: 6,
      image: "/swiper-6.jpg",
      title: "Мовленнєвий лабораторіум 2023",
      description:
        "'Мовленнєвий лабораторіум 2023' — концентрат новаторських підходів, кейсів та лайфхаків для логопедів, спрямований на обмін досвідом і вдосконалення професійних навичок.",
      url: "https://www.prostir.ua/event/u-prymischenni-filiji-42-lvivskoji-munitsypalnoji-biblioteky-vidbudetsya-osvitnij-zahid-movlennevyj-laboratorium-2023-osin/",
      tag: "Репортаж",
    },
    {
      id: 7,
      image: "/swiper-7.jpg",
      title: "Мовленнєвий лабораторіум 2023",
      description:
        "На Львівщині 12 грудня 2023 року відбувся черговий «Мовленнєвий лабораторіум 2023» / ЗИМА / — масштабний захід для логопедів, який об’єднав понад 350 фахівців регіону. Учасники мали змогу обговорити актуальні пит...",
      url: "https://4studio.com.ua/novyny/na-lvivshhyni-vidbuvsya-movlennyevyj-laboratorium-foto-video/",
      tag: "Репортаж",
    },
  ];

  // Handlers to navigate the carousel
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

  // Effect to track the active slide index
  useEffect(() => {
    if (carouselApi) {
      const updateSelected = () => {
        setSelectedIndex(carouselApi.selectedScrollSnap());
      };

      // Listen to the 'select' event to update the active slide
      carouselApi.on("select", updateSelected);
      // Initialize the selected index
      setSelectedIndex(carouselApi.selectedScrollSnap());

      return () => {
        carouselApi.off("select", updateSelected);
      };
    }
  }, [carouselApi]);

  return (
    <section className='max-w-[1400px] w-full mx-auto px-4 mt-24 md:mt-[12.5rem]'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-4'>
        {/* Left Section */}
        <div className='space-y-5 md:space-y-6'>
          <div className='relative'>
            <span className='text-sm md:text-base text-black font-lora'>
              Освітні продукти та події
            </span>
            <div className='h-[0.19rem] w-[4.5rem] bg-orange absolute -bottom-1 left-0' />
          </div>
          <h2 className='text-2xl md:text-5xl font-lora text-black'>
            Дізнайтеся більше у блозі &quot;ЛОГОДАР&quot;{" "}
          </h2>
          <p className='text-grey font-inter text-sm md:text-base mt-5'>
            Останні новини, корисні матеріали та авторські поради у сфері
            логопедії, мовленнєвої терапії та розвитку. Розширюйте знання разом
            з провідними експертами.
          </p>
          <div className='hidden md:block'>
            <ReusableButton text='Детальніше' />
          </div>
        </div>

        {/* Carousel Section */}
        <div className='lg:col-span-2 relative'>
          <Carousel
            setApi={setCarouselApi}
            opts={{
              loop: true,
              speed: 300, // Adjusted speed for smooth transition
              align: "start", // Ensure alignment starts from the beginning
            }}
            className='w-full'
          >
            <CarouselContent>
              {posts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className='basis-full md:basis-1/2  flex-shrink-0 '
                >
                  <Card className='border-none shadow-none bg-transparent h-full'>
                    <CardContent className='p-0 h-full flex flex-col justify-between'>
                      {/* Image Section */}
                      <div className='relative overflow-hidden rounded-2xl flex-grow'>
                        <Image
                          src={post.image}
                          alt={post.title}
                          className='w-full h-60 object-cover transition-transform duration-300 hover:scale-105 rounded-2xl'
                          width={600}
                          height={400}
                        />
                        <Badge className='absolute top-4 left-4 bg-black text-white hover:bg-black/80 px-6 py-1.5 rounded-full text-xs font-inter'>
                          {post.tag}
                        </Badge>
                      </div>
                      {/* Content Section */}
                      <div className='mt-6 space-y-4 px-0 md:px-4 flex-grow flex flex-col justify-between'>
                        <div>
                          <h2 className='text-xl md:text-2xl text-black font-lora '>
                            {post.title}
                          </h2>
                          <p className='text-grey font-inter text-sm md:text-base pt-2 pb-5'>
                            {post.description}
                          </p>
                        </div>
                        <button
                          variant='outline'
                          className='border-2 border-orange text-black hover:bg-orange/20 rounded-md px-4 py-2 text-sm md:text-base font-normal max-w-40 md:max-w-56 w-full transition'
                        >
                          <Link
                            href={post.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='link'
                          >
                            Дізнатися більше
                          </Link>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Buttons and Dots */}
          <div className='mt-8 flex items-center justify-center gap-8'>
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className='hover:text-orange border-none h-10 w-10 flex items-center justify-center rounded-full bg-transparent'
              aria-label='Previous Slide'
            >
              {/* Left Arrow SVG */}
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

            {/* Dots Indicator */}
            <div className='flex gap-2'>
              {posts.map((_, index) => (
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

            {/* Next Button */}
            <button
              onClick={handleNext}
              className='hover:text-orange border-none h-10 w-10 flex items-center justify-center rounded-full bg-transparent'
              aria-label='Next Slide'
            >
              {/* Right Arrow SVG */}
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
      </div>
    </section>
  );
}
