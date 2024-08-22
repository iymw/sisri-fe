"use client";
import Image from "next/image";
import React from "react";
import { CiLogout } from "react-icons/ci";

import Button from "@/components/buttons/Button";
import Typography from "@/components/Typography";

const SideNavbarAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen w-[25%] flex-col items-center space-y-8 py-8 shadow-lg">
        <hgroup className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/images/LOGO-PRIMARY.png"
            width={75}
            height={75}
            alt="logo"
          />
          <Typography className="!text-base">SISRI Dashboard Admin</Typography>
        </hgroup>
        {children}
        <Button leftIcon={CiLogout} variant="ghost">
          Logout
        </Button>
      </div>
    </>
  );
};

export default SideNavbarAdmin;
