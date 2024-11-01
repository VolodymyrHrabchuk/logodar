// BlogCarousel.js
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ReusableButton } from "./ui/ReusableButton";


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
        "Ця випуск Майстерні, буде корисний тим, хто стикається з викликами мовленнєвого відновлення після інсульту. Логопед – Тетяна Ярмак пояснює роль логопеда у реабілітації, т...",
      tag: "Подкаст",
    },
    {
      id: 2,
      image: "/swiper-2.jpg",
      title: "Чи допоможе логопед знову заговорити?",
      description:
        "У цьому епізоді 'Майстерні' ми зустрічаємося з Тетяною Ярмак, експертом-логопедом, щоб обговорити широкий спектр питань мовленнєвого розвитку. Від розкриття впливу оточен...",
      tag: "Подкаст",
    },
    {
      id: 3,
      image: "/swiper-1.jpg",
      title: "Integer molestie lorem at massa",
      description:
        "Facilisis in pretium nisl aliquet. Nulla volutpat aliquam velit.",
      tag: "Подкаст",
    },
    {
      id: 4,
      image: "/swiper-2.jpg",
      title: "Another Post Title",
      description: "Additional description for the fourth post goes here.",
      tag: "Подкаст",
    },
    // Add more posts as needed
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
    <div className='max-w-[1400px] w-full mx-auto px-4 mt-64'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-4'>
        {/* Left Section */}
        <div className='space-y-6'>
          <div className='relative'>
            <span className='text-sm text-black font-lora'>
              Освітні продукти та події
            </span>
            <div className='h-0.5 w-14 bg-orange absolute -bottom-1 left-0' />
          </div>
          <h2 className='text-5xl font-lora text-black'>
            Дізнайтеся більше у блозі &quot;ЛОГОДАР&quot;{" "}
          </h2>
          <p className='text-grey font-inter text-base'>
            Останні новини, корисні матеріали та авторські поради у сфері
            логопедії, мовленнєвої терапії та розвитку. Розширюйте знання разом
            з провідними експертами.
          </p>
          <ReusableButton text='Детальніше' />
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
                <CarouselItem key={post.id}>
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
                      <div className='mt-6 space-y-4 px-4 flex-grow flex flex-col justify-between'>
                        <div>
                          <h2 className='text-2xl text-black font-lora tracking-tight'>
                            {post.title}
                          </h2>
                          <p className='text-grey font-inter text-base pt-2 pb-5'>
                            {post.description}
                          </p>
                        </div>
                        <button
                          variant='outline'
                          className='border-2 border-orange text-black hover:bg-orange/20 rounded-md px-4 py-2 text-base font-normal max-w-56 w-full transition'
                        >
                          Дізнатися більше
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
    </div>
  );
}
