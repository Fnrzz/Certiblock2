import Documentation from "@/components/main/Documentation";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import Verification from "@/components/main/Verification";
import WhyChoose from "@/components/main/WhyChoose";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <WhyChoose />
      <Documentation />
      <Verification />
    </div>
  );
}
