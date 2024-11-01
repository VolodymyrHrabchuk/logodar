import Image from "next/image";
import HeroSection from "../components/HeroSection";
import BlogCarousel from "@/components/BlogCarousel";
import SubscribeSection from "@/components/SubscribeSection";
import ConsultationSection from "@/components/ConsultationSection";
import TreatmentSection from "@/components/TreatmentSection";
import ExpertsCarousel from "@/components/ExpertsCarousel";
import TestimonialCarousel from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BlogCarousel />
      <SubscribeSection />
      <ConsultationSection />
      <TreatmentSection />
      <ExpertsCarousel />
      <TestimonialCarousel />
    </main>
  );
}
