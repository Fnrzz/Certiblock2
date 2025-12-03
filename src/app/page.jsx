import Hero from "@/components/main/Hero";
import HowItWorks from "@/components/main/HowItWorks";
import Navbar from "@/components/main/Navbar";
import Verification from "@/components/main/Verification";
import WhyChoose from "@/components/main/WhyChoose";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Verification />
      <WhyChoose />
      <HowItWorks />
    </div>
  );
}
