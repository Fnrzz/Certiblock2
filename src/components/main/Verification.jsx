"use client";

import VerifyCertificate from "../form/form-elements/VerifyCertificate";

const Verification = () => {
  return (
    <section
      id="verification"
      className="container mx-auto py-20 px-4 scroll-mt-28"
    >
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Cek Keaslian Ijazah</h1>
        <span className="text-xl text-gray-500">
          Unggah file ijazah digital untuk memverifikasi keasliannya di
          blockchain
        </span>
      </div>
      <div className="w-full max-w-3xl h-90 mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow">
        <VerifyCertificate />
      </div>
    </section>
  );
};

export default Verification;
