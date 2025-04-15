import Navbar from "@/components/Navbar";

import ContactForm from "@/components/ContactForm";
import { ReusableButton } from "@/components/ui/ReusableButton";
import Image from "next/image";
import SpecialistsGrid from "@/components/specialists/SpecialistsGrid";
import SpecialistsHero from "@/components/specialists/SpecialistHero";
import TestimonialCarousel from "@/components/Testimonials";

export default function SpecialistsPage() {
  return (
    <main>
      <Navbar isSpecialistsPage={true} />

      <SpecialistsHero />
      <section>
        <SpecialistsGrid />
      </section>
      <section className='mt-16'>
        <TestimonialCarousel />
      </section>
      <section>
        <ContactForm />
      </section>
    </main>
  );
}
