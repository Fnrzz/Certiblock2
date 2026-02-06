import { Sparkles } from "lucide-react";
import Button from "../ui/button/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-accent/20 to-background py-20 md:py-28">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-primary">
              Didukung oleh Teknologi Blockchain
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Validasi Instan.
            <br />
            Integritas Terjaga.
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Platform resmi untuk memverifikasi keaslian ijazah digital{" "}
            <span className="font-semibold text-foreground">
              Universitas Muhammadiyah Surakarta
            </span>{" "}
            secara instan, transparan, dan anti-pemalsuan. Lindungi kredibilitas
            akademik Anda sekarang.
          </p>

          <div className="mx-auto max-w-2xl flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="#documentation">
              <Button variant="outline">Lihat Dokumentasi</Button>
            </Link>
            <Link href="#verification">
              <Button>Coba Verifikasi Sekarang</Button>
            </Link>
          </div>
          <p className="mt-10 text-sm text-muted-foreground text-center">
            Dipercaya oleh institusi dan perekrut global.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
