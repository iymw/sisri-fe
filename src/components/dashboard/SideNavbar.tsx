"use client";
import Image from "next/image";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { IoMdClose, IoMdMenu } from "react-icons/io";

import { cn } from "@/lib/utils";

import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Typography from "@/components/Typography";

const SideNavbar = ({
  children,
  onClick,
  openCloseNav,
  status,
}: {
  children: React.ReactNode;
  onClick: () => void;
  openCloseNav: boolean;
  status: string;
}) => {
  return (
    <>
      <div
        className={cn(
          "hidden min-h-screen w-full flex-col items-center space-y-8 py-8 shadow-lg md:flex md:w-[25%] md:translate-x-0",
          openCloseNav ? "!flex" : "hidden",
        )}
      >
        <hgroup className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/images/LOGO-PRIMARY.png"
            width={75}
            height={75}
            alt="logo"
          />
          <Typography className="!text-base">
            SISRI Dashboard {status}
          </Typography>
        </hgroup>
        {children}
        <Button leftIcon={CiLogout} variant="ghost">
          Logout
        </Button>

        <IconButton
          className="flex md:hidden"
          onClick={onClick}
          icon={IoMdClose}
          variant="red"
        />
      </div>
      {!openCloseNav && (
        <IconButton
          className="fixed bottom-8 left-8 flex md:hidden"
          onClick={onClick}
          icon={IoMdMenu}
          variant="blue"
        />
      )}
    </>
  );
};

export default SideNavbar;
