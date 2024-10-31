import Image from "next/image";
import HeroSection from "../components/HeroSection";
import BlogCarousel from "@/components/BlogCarousel";
import SubscribeSection from "@/components/SubscribeSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BlogCarousel />
      <SubscribeSection />
    </main>
  );
}
