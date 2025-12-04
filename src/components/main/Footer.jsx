import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/logo/logo-icon-light.png"}
              alt={"logo"}
              width={40}
              height={40}
              className="w-auto h-auto"
            />
            <h3 className="flex text-xl font-bold ">
              Certi<div className="text-blue-500">Block</div>
            </h3>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Syarat & Ketentuan
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Bantuan
            </a>
          </nav>
        </div>

        <div className="border-t pt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Ditenagai oleh{" "}
            <span className="font-semibold text-foreground">
              Universitas Muhammadiyah Surakarta
            </span>{" "}
            & Blockchain Technology
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Certiblock. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
