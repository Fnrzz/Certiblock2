"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Burger = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-col gap-1">
          <div className="w-6 h-1 bg-gray-600"></div>
          <div className="w-6 h-1 bg-gray-600"></div>
          <div className="w-6 h-1 bg-gray-600"></div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription className="flex flex-col gap-3">
            <Link href={"#home"} className="text-lg hover:text-blue-500">
              Beranda
            </Link>
            <Link
              href={"#verification"}
              className="text-lg hover:text-blue-500"
            >
              Verifikasi
            </Link>
            <Link
              href={"#how-it-works"}
              className="text-lg hover:text-blue-500"
            >
              Dokumentasi
            </Link>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const Navbar = () => {
  return (
    <div className="w-full h-16 px-6 py-4 sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-full flex items-center justify-between">
        <div className="h-full flex items-center gap-4">
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
          <hr className="w-px h-full border-0 bg-gray-400 lg:block hidden" />
          <h3 className="text-gray-400 lg:block hidden">UMS Verifikasi</h3>
        </div>
        <div className=" gap-4 lg:flex hidden">
          <Link href={"#home"} className="hover:text-blue-500">
            Beranda
          </Link>
          <Link href={"#verification"} className="hover:text-blue-500">
            Verifikasi
          </Link>
          <Link href={"#how-it-works"} className="hover:text-blue-500">
            Dokumentasi
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Burger />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
