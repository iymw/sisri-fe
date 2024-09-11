import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BsSpeedometer2 } from "react-icons/bs";
import { CiGrid41, CiLocationOn } from "react-icons/ci";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import { IoIosWarning } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbTrafficLights } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";

import { cn } from "@/lib/utils";

import AqiIndex from "@/components/dashboard/admin/sections/AqiIndex";
import SideButton from "@/components/dashboard/SideButton";
import SideNavbar from "@/components/dashboard/SideNavbar";
// import TopNavbar from "@/components/dashboard/TopNavbar";
import Typography from "@/components/Typography";

type SideNavItem = {
  text: string;
  icon?: IconType | LucideIcon;
  href: string;
};

const items: SideNavItem[][] = [
  [
    { text: "Overview", icon: CiGrid41, href: "/overview" },
    { text: "SI-ROAD", icon: CiLocationOn, href: "/si-road" },
    { text: "SI-TRAFFIC", icon: TbTrafficLights, href: "/si-taffic" },
  ],
  [
    { text: "CCTV", icon: GiCctvCamera, href: "/cctv" },
    { text: "Pelanggaran", icon: IoIosWarning, href: "/pelanggaran" },
    {
      text: "Kondisi Lalu Lintas",
      icon: IoIosInformationCircleOutline,
      href: "/kondisi-lalu-lintas",
    },
  ],
];

const AdminPage = () => {
  const [openCloseNav, setOpenCloseNav] = useState<boolean>(false);

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/si-road/road/" +
          process.env.NEXT_PUBLIC_ID +
          "/air-quality",
      );
      const data = response.data.data;
      return data;
    },
  });

  const aqiItems = [
    // {
    //   icon: "AQI",
    //   title: "Air Quality Index",
    //   value: postQuery.data?.aqi,
    //   quality: postQuery.data?.quality,
    // },
    {
      icon: FaTemperatureHigh,
      title: "Temperature",
      value: postQuery.data?.temperature,
    },
    {
      icon: BsSpeedometer2,
      title: "Pressure",
      value: postQuery.data?.pressure,
    },
    { icon: WiHumidity, title: "Humidity", value: postQuery.data?.humidity },

    {
      icon: (
        <>
          PM<sub>10</sub>
        </>
      ),
      title: (
        <>
          PM<sub>10</sub>
        </>
      ),
      value: postQuery.data?.pm10,
    },
    {
      icon: (
        <>
          PM<sub>2.5</sub>
        </>
      ),
      title: (
        <>
          PM<sub>2.5</sub>
        </>
      ),
      value: postQuery.data?.pm25,
    },
    {
      icon: (
        <>
          PM<sub>1</sub>
        </>
      ),
      title: (
        <>
          PM<sub>1</sub>
        </>
      ),
      value: postQuery.data?.pm1,
    },

    { icon: "CO", title: "CO", value: postQuery.data?.co },
    {
      icon: (
        <>
          NO<sub>2</sub>
        </>
      ),
      title: (
        <>
          NO<sub>2</sub>
        </>
      ),
      value: postQuery.data?.no2,
    },
    {
      icon: (
        <>
          O<sub>3</sub>
        </>
      ),
      title: (
        <>
          O<sub>3</sub>
        </>
      ),
      value: postQuery.data?.ozone,
    },
  ];

  if (postQuery.isLoading) return <>Loading...</>;
  if (postQuery.isError) return <>Error loading data!!!</>;

  return (
    <>
      <div className="flex">
        {/* <TopNavbar onClick={() => setOpenCloseNav(!openCloseNav)} /> */}
        <SideNavbar
          onClick={() => setOpenCloseNav(!openCloseNav)}
          openCloseNav={openCloseNav}
          status="Admin"
        >
          {items.map((item, indexItem) => (
            <hgroup className="w-full space-y-4" key={indexItem}>
              <Typography className="pl-8 !text-base text-zinc-400">
                {indexItem === 0 ? "Main Menu" : "Other Menu"}
              </Typography>
              <section>
                {item.map((i: SideNavItem, indexI) => (
                  <div key={indexI}>
                    <SideButton
                      href={i.href}
                      className="text-black hover:bg-slate-100"
                      icon={i.icon}
                    >
                      {i.text}
                    </SideButton>
                  </div>
                ))}
              </section>
            </hgroup>
          ))}
        </SideNavbar>
        <section className="w-full space-y-4 p-8">
          <div className="relative flex justify-between rounded bg-blue-active/30 p-6">
            <div className="space-y-12">
              <Typography>Indeks Kualitas Udara</Typography>
              <Typography
                variant="h2"
                weight="semibold"
                className={cn(
                  postQuery.data.quality === "GOOD" ? "text-green-600" : "",
                )}
              >
                {postQuery.data.aqi}
              </Typography>
            </div>
            <div className="absolute bottom-0 right-6">
              <Image
                src="/images/map-icon.png"
                alt="smart-air-quality"
                width={300}
                height={300}
              ></Image>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {aqiItems.map((aqiItem, index) => (
              <AqiIndex
                key={index}
                icon={aqiItem.icon}
                title={aqiItem.title}
                value={aqiItem.value}
                // quality={aqiItem.quality}
              ></AqiIndex>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminPage;
