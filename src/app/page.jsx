import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import WhyChoose from "@/components/main/WhyChoose";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <WhyChoose />
    </div>
  );
}
