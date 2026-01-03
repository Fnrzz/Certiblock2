"use client";
import ComponentCard from "@/components/common/ComponentCard";
import CreateCertificate from "@/components/form/form-elements/CreateCertificate";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { X } from "lucide-react";
import React from "react";

const page = () => {
  const modal = useModal();
  return (
    <div className="dark:text-white">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold">Certificate Create</h2>
        <Button onClick={modal.openModal} variant="link" className="ml-auto">
          Tutorial?
        </Button>
      </div>
      <ComponentCard title={"Input Data Student"}>
        <CreateCertificate />
      </ComponentCard>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.closeModal}
        className="relative w-full max-w-4xl p-0 overflow-hidden bg-black text-center group"
      >
        <button
          onClick={modal.closeModal}
          className="
                absolute top-3 right-3 z-50 
                p-2 rounded-full 
                bg-black/50 text-white 
                hover:bg-white hover:text-black 
                transition-all duration-200
                border border-white/20
              "
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        <div className="relative w-full aspect-video">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube-nocookie.com/embed/K8bkPw-bARA?si=Fshx7S1QuF5oyEJQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default page;
