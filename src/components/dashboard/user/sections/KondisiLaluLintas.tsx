"use client";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6";

import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Input from "@/components/forms/Input";

type SandboxForm = {
  from: string;
  to: string;
};

const KondisiLaluLintas = () => {
  const methods = useForm<SandboxForm>({ mode: "onTouched" });
  const { handleSubmit } = methods;

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<SandboxForm> = (data) => console.log(data);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const center = { lat: -7.250445, lng: 112.768845 };

  const [map, setMap] = useState<google.maps.Map | null>(null);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [directionsResponse, setDirectionsResponse] = useState<any | null>(
    null,
  );

  const originRef = useRef<HTMLInputElement | null>(null);
  const destiantionRef = useRef<HTMLInputElement | null>(null);

  async function calculateRoute() {
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: originRef.current?.value as string,
      destination: destiantionRef.current?.value as string,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
  }

  if (!isLoaded) return <></>;

  return (
    <>
      <section className="min-h-screen w-full space-y-8 p-8 pt-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <Autocomplete>
                <Input
                  id="from"
                  label="From"
                  placeholder="e.g. ITS Surabaya"
                  ref={originRef}
                />
              </Autocomplete>
              <Autocomplete>
                <Input
                  id="to"
                  label="To"
                  ref={destiantionRef}
                  placeholder="e.g. Galaxy Mall"
                />
              </Autocomplete>
            </div>
            <Button variant="blue" onClick={calculateRoute}>
              Go
            </Button>
          </form>
        </FormProvider>

        <div className="space-y-4">
          <IconButton
            icon={FaDownLeftAndUpRightToCenter}
            onClick={() => map?.panTo(center)}
            variant="ghost"
          ></IconButton>
          <GoogleMap
            mapContainerStyle={{
              height: "500px",
              width: "100%",
              borderRadius: "0.25rem",
            }}
            center={center}
            zoom={10}
            onLoad={(map) => setMap(map)}
          >
            <>
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </>
          </GoogleMap>
        </div>
      </section>
    </>
  );
};

export default KondisiLaluLintas;
