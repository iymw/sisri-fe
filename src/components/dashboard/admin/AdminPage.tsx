"use client";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { CiGrid41, CiLocationOn } from "react-icons/ci";
import { GiCctvCamera } from "react-icons/gi";
import { IoIosWarning } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbTrafficLights } from "react-icons/tb";

import SideNavbarAdmin from "@/components/dashboard/admin/SideNavbarAdmin";
import SideButton from "@/components/dashboard/SideButton";
import Typography from "@/components/Typography";

type SideNavItem = {
  text: string;
  icon?: IconType | LucideIcon;
};

const items: SideNavItem[][] = [
  [
    { text: "Overview", icon: CiGrid41 },
    { text: "SI-ROAD", icon: CiLocationOn },
    { text: "SI-TRAFFIC", icon: TbTrafficLights },
  ],
  [
    { text: "CCTV", icon: GiCctvCamera },
    { text: "Pelanggaran", icon: IoIosWarning },
    {
      text: "Kondisi Lalu Lintas",
      icon: IoIosInformationCircleOutline,
    },
  ],
];

const AdminPage = () => {
  const [active, setActive] = useState<number>(0);
  const trigger = (index: number) => setActive(index);

  return (
    <>
      <SideNavbarAdmin>
        {items.map((item, indexItem) => (
          <hgroup className="w-full space-y-4" key={indexItem}>
            <Typography className="pl-8 !text-base text-zinc-400">
              {indexItem === 0 ? "Main Menu" : "Other Menu"}
            </Typography>
            <section>
              {item.map((i: SideNavItem, indexI) => (
                <div key={indexI}>
                  <SideButton
                    onClick={() =>
                      trigger(indexItem === 0 ? indexI : indexI + 3)
                    }
                    className={
                      active === (indexItem === 0 ? indexI : indexI + 3)
                        ? "border-r-2 border-blue-main bg-blue-active text-blue-main"
                        : "text-black hover:bg-slate-100"
                    }
                    icon={i.icon}
                  >
                    {i.text}
                  </SideButton>
                </div>
              ))}
            </section>
          </hgroup>
        ))}
      </SideNavbarAdmin>
    </>
  );
};

export default AdminPage;
