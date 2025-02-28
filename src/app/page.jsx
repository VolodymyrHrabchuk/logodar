"use client";
// pages/index.jsx
import { useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BlogCarousel from "@/components/BlogCarousel";
import SubscribeSection from "@/components/SubscribeSection";
import ConsultationSection from "@/components/ConsultationSection";
import TreatmentSection from "@/components/TreatmentSection";
import ExpertsCarousel from "@/components/ExpertsCarousel";
import TestimonialCarousel from "@/components/Testimonials";
import CalendarEvents from "@/components/Calendar";

export default function Home() {
  const blogRef = useRef(null);
  const consultationRef = useRef(null);
  const specialistsRef = useRef(null);

  const scrollToBlog = () => {
    blogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToConsultation = () => {
    consultationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSpecialists = () => {
    specialistsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <Navbar
        scrollToBlog={scrollToBlog}
        scrollToConsultation={scrollToConsultation}
        scrollToSpecialists={scrollToSpecialists}
      />

      <section>
        <HeroSection />
      </section>

      <section ref={blogRef} className='scroll-mt-[30px]'>
        <BlogCarousel />
      </section>

      <section>
        <SubscribeSection />
      </section>

      <section ref={consultationRef} className='scroll-mt-[30px]'>
        <ConsultationSection />
      </section>

      <section>
        <TreatmentSection />
      </section>
      <CalendarEvents />

      <section ref={specialistsRef} className='scroll-mt-[30px]'>
        <ExpertsCarousel />
      </section>

      <section>
        <TestimonialCarousel />
      </section>
    </main>
  );
}
