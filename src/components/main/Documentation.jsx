"use client";

import {
  CircleCheck,
  Database,
  FileBraces,
  FileCode,
  Shield,
  Upload,
  UserRoundCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const TabsContent1 = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">Alur Kerja Sistem</h1>
      <p className="text-gray-500">
        Proses verifikasi ijazah dari penerbitan hingga validasi
      </p>
      <div className="flex flex-col gap-10 mt-10">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="py-3 px-6 max-w-max flex items-center justify-center bg-blue-500 rounded-md">
            <span className="text-lg text-center text-white font-bold">1</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Upload className="w-8 h-8 text-blue-500" />
              <span className="text-lg font-bold">
                Universitas Menerbitkan Sertifikat
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Universitas Menerbitkan Sertifikat untuk lulusan Universitas
              Muhammadiyah Surakarta
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="py-3 px-6 max-w-max flex items-center justify-center bg-yellow-500 rounded-md">
            <span className="text-lg text-center text-white font-bold">2</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FileBraces className="w-8 h-8 text-yellow-500" />
              <span className="text-lg font-bold">
                Lulusan Menerima File JSON
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Lulusan menerima file JSON ijazah mereka. File JSON ini dapat
              dibagikan dengan pemberi kerja atau institusi untuk verifikasi
              instan.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="py-3 px-6 max-w-max flex items-center justify-center bg-green-500 rounded-md">
            <span className="text-lg text-center text-white font-bold">3</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CircleCheck className="w-8 h-8 text-green-500" />
              <span className="text-lg font-bold">Verifikasi Instan</span>
            </div>
            <p className="text-sm text-gray-500">
              Pemberi kerja atau entitas publik memverifikasi file JSON ijazah
              di CertiBlock. Blockchain mengembalikan status verifikasi secara
              instan dengan detail ijazah lengkap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsContent2 = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">Arsitektur Sistem</h1>
      <p className="text-gray-500">
        Alur komunikasi antara frontend dan smart contract
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <div className="flex flex-col gap-3 items-center bg-gray-100 p-4 rounded-md">
          <div className="flex items-center justify-center p-3 max-w-max bg-blue-100 rounded-lg">
            <FileCode className="w-8 h-8 text-blue-500" />
          </div>
          <h6 className="text-lg">Frontend App</h6>
          <p className="text-sm text-gray-500 text-center">
            Aplikasi web Next JS untuk mengunggah dan memverifikasi ijazah
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center bg-gray-100 p-4 rounded-md">
          <div className="flex items-center justify-center p-3 max-w-max bg-green-100 rounded-lg">
            <Database className="w-8 h-8 text-green-500" />
          </div>
          <h6 className="text-lg">Smart Contract</h6>
          <p className="text-sm text-gray-500 text-center">
            Kontrak pintar untuk <br /> menyimpan dan memvalidasi data
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center bg-gray-100 p-4 rounded-md">
          <div className="flex items-center justify-center p-3 max-w-max bg-yellow-100 rounded-lg">
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
          <h6 className="text-lg">Blockchain</h6>
          <p className="text-sm text-gray-500 text-center">
            Jaringan blockchain <br /> terdesentralisasi untuk keamanan data
          </p>
        </div>
      </div>
      <div className=" bg-gray-100 p-4 rounded-md mt-10">
        <h6 className="text-lg font-bold">Alur Komunikasi</h6>
        <div className="flex gap-3 mt-5">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
            1
          </span>
          <span>User mengunggah file JSON melalui frontend</span>
        </div>
        <div className="flex gap-3 mt-5">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
            2
          </span>
          <span>
            Frontend melakukan hashing dari isi file dan mengirim query ke smart
            contract
          </span>
        </div>
        <div className="flex gap-3 mt-5">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
            3
          </span>
          <span>Smart contract memverifikasi hash di blockchain</span>
        </div>
        <div className="flex gap-3 mt-5">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
            4
          </span>
          <span>Hasil validasi dikembalikan dan ditampilkan ke user</span>
        </div>
      </div>
    </div>
  );
};

const TabsContent3 = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">Tutorial untuk Penerbit</h1>
      <p className="text-gray-500">
        Panduan bagi admin universitas untuk menerbitkan ijazah digital
      </p>
      <div className="flex flex-col gap-5 mt-10">
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              1
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Login ke Dashboard Admin</span>
              <span>
                Masuk ke dashboard admin menggunakan kredensial yang telah
                diberikan oleh administrator sistem.
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              2
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Isi Form Penerbitan</span>
              <span>
                Isi form penerbitan ijazah digital dengan data yang sesuai.
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              3
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Minting Sertifikat</span>
              <span>
                Klik tombol "Simpan" untuk membuat sertifikat digital dan
                mencatatnya di blockchain.
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              4
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Distribusi File JSON</span>
              <span>
                Unduh file JSON yang dihasilkan dan distribusikan kepada
                masing-masing lulusan melalui email atau portal mahasiswa.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsContent4 = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">Tutorial untuk Verifikator</h1>
      <p className="text-gray-500">
        Panduan bagi perusahaan atau institusi untuk memverifikasi ijazah
      </p>
      <div className="flex flex-col gap-5 mt-10">
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              1
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Minta File JSON dari Pelamar</span>
              <span>
                Minta calon karyawan atau pelamar untuk memberikan file ijazah
                digital (.json) yang mereka terima dari UMS.
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              2
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Unggah File ke Platform</span>
              <span>
                Buka halaman ini dan unggah file .json pada kolom verifikasi
                dengan cara drag & drop atau klik untuk memilih file.
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              3
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Menunggu Verifikasi</span>
              <span>
                Setelah file terunggah, tunggu sistem memeriksa data di
                blockchain.
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
              4
            </span>
            <div className="flex flex-col ">
              <span className="font-bold">Lihat Hasil Validasi</span>
              <span>
                Sistem akan menampilkan status validitas ijazah beserta detail
                informasi mahasiswa jika ijazah terverifikasi valid.
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-green-50 p-4 rounded-md ">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full text-green-800 text-sm flex items-center justify-center">
              <UserRoundCheck />
            </span>
            <div className="flex flex-col ">
              <span className="font-bold text-green-800">
                Lihat Hasil Validasi
              </span>
              <span className="text-green-800">
                Sistem akan menampilkan status validitas ijazah beserta detail
                informasi mahasiswa jika ijazah terverifikasi valid.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsComponent = () => {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="w-full h-25 md:h-15 p-2 grid grid-cols-2 md:grid-cols-4 mb-5 ">
        <TabsTrigger
          className="rounded-full text-blue-900 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          value="tab1"
        >
          Cara Kerja
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full text-blue-900 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          value="tab2"
        >
          Arsitektur
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full text-blue-900 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          value="tab3"
        >
          Tutorial Penerbit
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full text-blue-900 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          value="tab4"
        >
          Tutorial Verifikator
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="tab1"
        className="p-6 rounded-lg border border-gray-200 shadow"
      >
        <TabsContent1 />
      </TabsContent>
      <TabsContent
        value="tab2"
        className="p-6 rounded-lg border border-gray-200 shadow"
      >
        <TabsContent2 />
      </TabsContent>
      <TabsContent
        value="tab3"
        className="p-6 rounded-lg border border-gray-200 shadow"
      >
        <TabsContent3 />
      </TabsContent>
      <TabsContent
        value="tab4"
        className="p-6 rounded-lg border border-gray-200 shadow"
      >
        <TabsContent4 />
      </TabsContent>
    </Tabs>
  );
};
const Documentation = () => {
  return (
    <section
      id="documentation"
      className="container mx-auto py-20 px-4 scroll-mt-10"
    >
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Dokumentasi</h1>
        <span className="text-xl text-gray-500">
          Pelajari cara kerja sistem verifikasi ijazah berbasis blockchain
        </span>
      </div>
      <div className="mx-auto w-full flex justify-center">
        <TabsComponent />
      </div>
    </section>
  );
};
export default Documentation;
