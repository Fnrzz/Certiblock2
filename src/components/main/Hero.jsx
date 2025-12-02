import { Sparkles } from "lucide-react";
import VerifyCertificate from "../form/form-elements/VerifyCertificate";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-accent/20 to-background py-20 md:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-primary">
              Didukung oleh Teknologi Blockchain
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Validasi Instan.
            </span>
            <br />
            <span className="text-foreground">Integritas Terjaga.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Platform verifikasi ijazah digital resmi untuk lulusan{" "}
            <span className="font-semibold text-foreground">
              Universitas Muhammadiyah Surakarta.
            </span>{" "}
            Aman, transparan, dan anti-pemalsuan berkat teknologi Blockchain.
          </p>

          <div className="mx-auto max-w-2xl">
            <VerifyCertificate />
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Dipercaya oleh institusi dan perekrut global.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
