"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function SpecialistsGrid() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  // State to store the Carousel API
  const [carouselApi, setCarouselApi] = useState(null);
  // State to track the currently active slide
  const [selectedIndex, setSelectedIndex] = useState(0);

  const specialists = [
    {
      id: 1,
      name: "Оксана МІЩЕНКО",
      title: "Психолог",
      subtitle:
        "Консультування та терапія людей після інсультів, їх рідних; постраждалих в наслідок бойових дій; тих, хто опинився в складних життєвих ситуаціях",
      image: "doc-1.webp",
      specialties: [],
      education: [
        "Хмельницький національний університет спеціальність «Психологія», професійна кваліфікація «Психолог. Практичний психолог в соціальній сфері. Викладач з психологічних дисциплін у закладах вищої освіти. Магістр з психології», 2023 р",
        "Український інститут позитивної крос-культурної психотерапії та менеджменту (2023-2025рр.)",
      ],
    },
    {
      id: 2,
      name: "Людмила ПУЦЬ",
      title: "Асистента логопеда",
      subtitle:
        "Працює з пацієнтами за складеними програмами під керівництвом логопеда центру, бере участь в складанні індивідуальних програм з відновлення мови і мовлення",
      image: "doc-2.webp",
      specialties: [],
      education: [
        "Полтавський національний педагогічний університет імені В.Г. Короленка, психолого-педагогічний факультет, кваліфікація «Дефектолог. Логопед», спеціальність «Логопед. Практичний психолог», 2010 р.",
      ],
    },
    {
      id: 3,
      name: "Ірина ЛУЧАК",
      title: "Старший адміністратор центру",
      subtitle: "",
      image: "doc-3.webp",
      specialties: [],
      education: [
        'Прикарпатський Національний університет імені Василя Стефаника Диплом магістра за спеціальністю "Соціальний педагог. Викладач", 2011р.',
      ],
    },
    {
      id: 4,
      name: "Наталія ГАЛЯН",
      title: "Асистента логопеда",
      subtitle:
        "Працює з пацієнтами за складеними програмами під керівництвом логопеда центру, бере участь в складанні індивідуальних програм з відновлення мови і мовлення",
      image: "doc-6.webp",
      specialties: [],
      education: [
        "Тернопільський національний педагогічний університет ім. Володимира Гнатюка – викладач психологічних дисциплін. Психолог-дослідник, 2018",
        "Волинський національний університет ім. Лесі Українки, магістратура, спеціальність корекційна психопедагогіка – вчитель-дефектолог, логопед.",
      ],
    },
    {
      id: 5,
      name: "Надія ШПИТКО",
      title: "Асистента логопеда",
      subtitle:
        "Працює з пацієнтами за складеними програмами під керівництвом логопеда центру, бере участь в складанні індивідуальних програм з відновлення мови і мовлення",
      image: "doc-4.webp",
      specialties: [],
      education: [
        'Комунальний заклад фахової передвищої освіти "Івано-Франківський медичний фаховий коледж" Івано-Франківської обласної ради, спеціальність «Медсестринство», освітня програма «Лікувальна справа», 2023',
        "Прикарпатський національний університет імені Василя Стефаника, спеціальність «Спеціальна освіта», спеціалізація «Логопедія», 2024",
      ],
    },
    {
      id: 6,
      name: "Валентина ЕТІНА",
      title: "Психолог. Тренер",
      subtitle:
        "Консультування та терапія людей після інсультів, їх рідних; постраждалих в наслідок бойових дій; тих, хто опинився в складних життєвих ситуаціях",
      image: "doc-5.webp",
      specialties: [],
      education: [
        "Донецька філія українського державного університету фінансів та міжнародної торгівлі, бакалавр, облік та аудит, 2006-2010",
        "Міжрегіональна академія управління персоналом, магістр, медичний психолог, 2020",
      ],
    },
    {
      id: 7,
      name: "Тетяна ЯРМАК",
      title: "Логопед-афазіолог-фонопед. Тренер освітніх проєктів центру",
      subtitle:
        "Консультування. Діагностика. Складання відновлювально-корекційних маршрутів",
      image: "doc-7.webp",
      specialties: [],
      education: [
        "Національний педагогічний університет ім. М.П.Драгоманова, спеціальна освіта, логопед, 2020",
      ],
    },
  ];

  const handleScheduleVisit = (specialist) => {
    setSelectedSpecialist(specialist);
    setIsOpen(true);
  };

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

  // Specialist card component to avoid duplication
  const SpecialistCard = ({ specialist }) => (
    <div className='flex flex-col items-center text-center'>
      {/* Specialist Image with Circle Background */}
      <div className='relative w-64 h-64 mb-6'>
        <div className='absolute inset-0 rounded-full'></div>
        <Image
          src={specialist.image || "/placeholder.svg"}
          alt={specialist.name}
          width={240}
          height={240}
          className='rounded-full object-cover object-center relative z-10'
          unoptimized
        />
      </div>

      {/* Specialist Name */}
      <h3 className='text-2xl font-lora text-black mb-2'>{specialist.name}</h3>

      {/* Specialist Title */}
      <p className='text-grey font-inter mb-2'>{specialist.title}</p>

      {/* Specialist Subtitle */}
      {specialist.subtitle && (
        <p className='text-grey font-inter text-sm mb-4 px-4'>
          {specialist.subtitle}
        </p>
      )}

      {/* Specialties List */}
      <ul className='text-left mb-4 space-y-2 w-full'>
        {specialist.specialties.map((specialty, index) => (
          <li key={index} className='flex items-start'>
            <span className='text-orange mr-2 mt-1'>•</span>
            <span className='text-grey font-inter text-sm'>{specialty}</span>
          </li>
        ))}
      </ul>

      {/* Education Section */}
      {specialist.education && specialist.education.length > 0 && (
        <div className='text-left w-full mb-6'>
          <h4 className='font-medium text-black mb-2'>Освіта:</h4>
          <ul className='space-y-2'>
            {specialist.education.map((edu, index) => (
              <li key={index} className='flex items-start'>
                <span className='text-orange mr-2 mt-1'>•</span>
                <span className='text-grey font-inter text-sm'>{edu}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Schedule Visit Button */}
      <button
        onClick={() => handleScheduleVisit(specialist)}
        className='border-2 border-orange text-black hover:bg-orange/20 rounded-md px-6 py-2 text-sm md:text-base font-normal transition mt-auto'
      >
        Запланувати візит
      </button>
    </div>
  );

  return (
    <div className='max-w-[1400px] mx-auto px-4 py-12'>
      {/* Mobile Carousel View */}
      <div className='md:hidden'>
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: true,
            speed: 300,
            align: "center",
          }}
          className='w-full'
        >
          <CarouselContent>
            {specialists.map((specialist) => (
              <CarouselItem key={specialist.id} className='basis-full'>
                <SpecialistCard specialist={specialist} />
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
            aria-label='Previous Specialist'
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
            {specialists.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === selectedIndex ? "bg-black scale-125" : "bg-black/50"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className='hover:text-orange border-none h-10 w-10 flex items-center justify-center rounded-full bg-transparent'
            aria-label='Next Specialist'
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

      {/* Desktop Grid View */}
      <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14'>
        {specialists.map((specialist) => (
          <SpecialistCard key={specialist.id} specialist={specialist} />
        ))}
      </div>
    </div>
  );
}
