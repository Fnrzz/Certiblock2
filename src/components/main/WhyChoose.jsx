"use client";

import { Globe, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const features = [
  {
    title: "Anti-Manipulasi",
    description:
      "Catatan disimpan di blockchain dan tidak dapat diubah. Keamanan kriptografi memastikan integritas data lengkap.",
    icon: (
      <ShieldCheck className="h-15 w-15 p-2 text-blue-500 bg-outline outline-2 outline-offset-2 outline-blue-500 rounded-md" />
    ),
  },
  {
    title: "Akses Global",
    description:
      "Verifikasi lulusan UMS dari mana saja di dunia secara instan. Tanpa batasan geografis.",
    icon: (
      <Globe className="h-15 w-15 p-2 text-green-500 bg-outline outline-2 outline-offset-2 outline-green-500 rounded-md" />
    ),
  },
  {
    title: "Verifikasi Cepat",
    description:
      "Verifikasi blockchain instan dalam hitungan detik. Validasi sertifikat super cepat untuk hasil langsung.",
    icon: (
      <Zap className="h-15 w-15 p-2 text-yellow-500 bg-outline outline-2 outline-offset-2 outline-yellow-500 rounded-md" />
    ),
  },
];

const Cards = () => {
  return features.map((feature) => (
    <Card
      key={feature.title}
      className="hover:outline-2 hover:outline-blue-500 hover:scale-102 transition duration-300"
    >
      <CardHeader>
        <div className="flex justify-center">{feature.icon}</div>
      </CardHeader>
      <CardContent>
        <h3 className="text-2xl font-bold text-center">{feature.title}</h3>
      </CardContent>
      <CardFooter>
        <p className="text-md text-muted-foreground text-center">
          {feature.description}
        </p>
      </CardFooter>
    </Card>
  ));
};
const WhyChoose = () => {
  return (
    <section className="container mx-auto py-20 px-4">
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Mengapa Memilih CertiBlock?</h1>
        <span className="text-xl text-gray-500">
          Teknologi blockchain canggih bertemu verifikasi akademik
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Cards />
      </div>
    </section>
  );
};

export default WhyChoose;
