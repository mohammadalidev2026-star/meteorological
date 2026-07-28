import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react";

const hourlyData = [
  { time: "00:00", temp: "20°", icon: "solar:cloud-rain-bold-duotone" },
  { time: "01:00", temp: "19°", icon: "solar:cloud-rain-bold-duotone" },
  { time: "02:00", temp: "19°", icon: "solar:cloud-rain-bold-duotone" },
  { time: "03:00", temp: "18°", icon: "solar:cloud-bold-duotone" },
  { time: "04:00", temp: "17°", icon: "solar:cloud-bold-duotone" },
  { time: "05:00", temp: "17°", icon: "solar:cloud-sun-bold-duotone" },
  { time: "06:00", temp: "18°", icon: "solar:cloud-sun-bold-duotone" },
  { time: "07:00", temp: "20°", icon: "solar:sun-bold-duotone" },
  { time: "08:00", temp: "22°", icon: "solar:sun-bold-duotone" },
  { time: "09:00", temp: "24°", icon: "solar:sun-bold-duotone" },
  { time: "10:00", temp: "26°", icon: "solar:sun-bold-duotone" },
  { time: "11:00", temp: "27°", icon: "solar:sun-bold-duotone" },
  { time: "12:00", temp: "28°", icon: "solar:sun-bold-duotone" },
  { time: "13:00", temp: "30°", icon: "solar:sun-bold-duotone" },
  { time: "14:00", temp: "31°", icon: "solar:sun-bold-duotone" },
  { time: "15:00", temp: "32°", icon: "solar:cloud-sun-bold-duotone" },
  { time: "16:00", temp: "31°", icon: "solar:cloud-sun-bold-duotone" },
  { time: "17:00", temp: "29°", icon: "solar:cloud-bold-duotone" },
  { time: "18:00", temp: "27°", icon: "solar:cloud-rain-bold-duotone" },
  { time: "19:00", temp: "25°", icon: "solar:cloud-rain-bold-duotone" },
  { time: "20:00", temp: "24°", icon: "solar:cloud-bold-duotone" },
  { time: "21:00", temp: "23°", icon: "solar:cloud-bold-duotone" },
  { time: "22:00", temp: "22°", icon: "solar:cloud-bold-duotone" },
  { time: "23:00", temp: "21°", icon: "solar:cloud-rain-bold-duotone" },
];

export default function HourlyForecast() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
          <Icon
            icon="solar:clock-circle-bold-duotone"
            className="text-3xl text-yellow-500"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800">پیش‌بینی ساعتی</h2>
      </div>

      <div className="relative">
        {/* دسکتاپ */}

        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className={`
    hidden
    lg:flex
    absolute
    left-0
    top-1/2
    -translate-y-1/2
    z-20
    w-12
    h-12
    rounded-full
    items-center
    justify-center
    border
    shadow-lg
    transition-all
    duration-300
    ${
      canPrev
        ? "bg-white border-gray-200 hover:bg-yellow-100 cursor-pointer"
        : "bg-gray-200 border-gray-200 cursor-not-allowed opacity-60"
    }
  `}
        >
          <Icon
            icon="solar:alt-arrow-left-bold"
            className={
              canPrev ? "text-2xl text-yellow-600" : "text-2xl text-gray-700"
            }
          />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canNext}
          className={`
    hidden
    lg:flex
    absolute
    right-0
    top-1/2
    -translate-y-1/2
    z-20
    w-12
    h-12
    rounded-full
    items-center
    justify-center
    border
    shadow-lg
    transition-all
    duration-300
    ${
      canNext
        ? "bg-white border-gray-200 hover:bg-yellow-100 cursor-pointer"
        : "bg-gray-200 border-gray-200 cursor-not-allowed opacity-60"
    }
  `}
        >
          <Icon
            icon="solar:alt-arrow-right-bold"
            className={
              canNext ? "text-2xl text-yellow-600" : "text-2xl text-gray-700"
            }
          />
        </button>

        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex">
            {hourlyData.map((item) => (
              <div
                key={item.time}
                className="
                flex-[0_0_70%]
                sm:flex-[0_0_45%]
                md:flex-[0_0_30%]
                lg:flex-[0_0_16.666%]
                px-2
                "
              >
                <div
                  className="
                  bg-white
                  rounded-3xl
                  border
                  border-gray-100
                  shadow-sm
                  p-5
                  text-center
                  hover:-translate-y-1
                  hover:shadow-lg
                  transition-all
                  duration-300
                  "
                >
                  <p className="text-sm text-gray-500">{item.time}</p>

                  <Icon
                    icon={item.icon}
                    className="text-5xl text-yellow-500 mx-auto my-4"
                  />

                  <h3 className="text-2xl font-bold text-gray-800">
                    {item.temp}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
