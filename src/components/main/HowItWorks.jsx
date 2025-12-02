"use client";

import { CircleCheck, FileBraces, Upload } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="container mx-auto py-20 px-4">
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Cara Kerja</h1>
        <span className="text-xl text-gray-500">
          Proses verifikasi yang sederhana, aman, dan transparan
        </span>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="py-3 px-6 max-w-max flex items-center justify-center bg-blue-500 rounded-md">
            <span className="text-2xl text-center text-white font-bold">1</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Upload className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">
                Universitas Menerbitkan Sertifikat
              </span>
            </div>
            <p className="text-gray-500">
              Universitas Menerbitkan Sertifikat untuk lulusan Universitas
              Muhammadiyah Surakarta
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="py-3 px-6 max-w-max flex items-center justify-center bg-yellow-500 rounded-md">
            <span className="text-2xl text-center text-white font-bold">2</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <FileBraces className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold">
                Lulusan Menerima File JSON
              </span>
            </div>
            <p className="text-gray-500">
              Lulusan menerima file JSON ijazah mereka. File JSON ini dapat
              dibagikan dengan pemberi kerja atau institusi untuk verifikasi
              instan.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="py-3 px-6 max-w-max flex items-center justify-center bg-green-500 rounded-md">
            <span className="text-2xl text-center text-white font-bold">3</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <CircleCheck className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">Verifikasi Instan</span>
            </div>
            <p className="text-gray-500">
              Pemberi kerja atau entitas publik memverifikasi file JSON ijazah
              di CertiBlock. Blockchain mengembalikan status verifikasi secara
              instan dengan detail ijazah lengkap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
