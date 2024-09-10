import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LucideIcon } from "lucide-react";
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
    {
      icon: "AQI",
      title: "Air Quality Index",
      value: postQuery.data?.aqi,
      quality: postQuery.data?.quality,
    },
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
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {aqiItems.map((aqiItem, index) => (
              <div
                key={index}
                className="flex justify-between rounded bg-blue-active/30 p-6"
              >
                <div className="flex justify-center">
                  {typeof aqiItem.icon === "string" ||
                  typeof aqiItem.icon === "object" ? (
                    <Typography
                      variant="bl"
                      weight="bold"
                      className="rounded-lg bg-blue-main p-4 text-white"
                    >
                      {aqiItem.icon}
                    </Typography>
                  ) : (
                    aqiItem.icon && (
                      <div className="flex items-center justify-center rounded-lg bg-blue-main p-4 text-3xl text-white">
                        <aqiItem.icon />
                      </div>
                    )
                  )}
                </div>
                <div className="flex flex-col justify-center text-right">
                  <Typography className="!text-base">
                    {aqiItem.title}
                  </Typography>
                  <Typography variant="bl" weight="bold">
                    {aqiItem.value}
                  </Typography>
                </div>
                {aqiItem.quality && (
                  <>
                    <div className="flex items-end justify-start">
                      <Typography
                        className={cn(
                          aqiItem.quality === "GOOD" ? "text-green-500" : "",
                        )}
                        weight="semibold"
                      >
                        {aqiItem.quality}
                      </Typography>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminPage;
