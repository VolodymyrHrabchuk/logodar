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
import CalendarEvents from "@/components/calendar/Calendar";
import ContactForm from "@/components/ContactForm";
import WebinarSection from "@/components/WebinarSection";

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
  return (
    <main>
      <Navbar
        scrollToBlog={scrollToBlog}
        scrollToConsultation={scrollToConsultation}
      />

      <section>
        <HeroSection />
      </section>

      <section ref={blogRef} id='blog' className='scroll-mt-[30px]'>
        <BlogCarousel />
      </section>

      <section className="mt-16">
        <WebinarSection />
      </section>

      <section>
        <SubscribeSection />
      </section>

      <section
        ref={consultationRef}
        id='consultation'
        className='scroll-mt-[30px]'
      >
        <ConsultationSection />
      </section>

      <section>
        <TreatmentSection />
      </section>

      <CalendarEvents />

      <section className='scroll-mt-[30px]'>
        <ExpertsCarousel />
      </section>

      <section>
        <TestimonialCarousel />
      </section>

      <section>
        <ContactForm />
      </section>
    </main>
  );
}
