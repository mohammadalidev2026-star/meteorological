import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react";

function getWeatherIcon(code, time) {
  const hour = Number(time.slice(11, 13));

  if (code === 0) {
    if (hour >= 19 || hour < 6) {
      return "solar:moon-bold-duotone";
    }

    return "solar:sun-bold-duotone";
  }

  if ([1, 2].includes(code)) {
    return "solar:cloud-sun-bold-duotone";
  }

  if (code === 3) {
    return "solar:cloud-bold-duotone";
  }

  if ([45, 48].includes(code)) {
    return "solar:cloud-fog-bold-duotone";
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "solar:cloud-rain-bold-duotone";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "solar:cloud-snow-bold-duotone";
  }

  if ([95, 96, 99].includes(code)) {
    return "solar:cloud-bolt-bold-duotone";
  }

  return "solar:cloud-bold-duotone";
}

function getWeatherText(code, time) {
  const hour = Number(time.slice(11, 13));

  if (code === 0) {
    if (hour >= 19 || hour < 6) {
      return "صاف";
    }

    return "آفتابی";
  }

  if ([1, 2].includes(code)) {
    return "کمی ابری";
  }

  if (code === 3) {
    return "ابری";
  }

  if ([45, 48].includes(code)) {
    return "مه";
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "بارانی";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "برفی";
  }

  if ([95, 96, 99].includes(code)) {
    return "طوفانی";
  }

  return "نامشخص";
}

function getCurrentKabulHour() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kabul",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const hourPart = parts.find((part) => part.type === "hour");

  return Number(hourPart?.value ?? 0);
}

function getCurrentKabulDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kabul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function HourlyForecast({ city, weather }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  /*
    ساعت فعلی افغانستان
  */
  const currentHour = getCurrentKabulHour();
  const currentDate = getCurrentKabulDate();

  /*
    دریافت 24 ساعت آینده از ساعت فعلی
  */
  const hourlyData = useMemo(() => {
    if (
      !weather?.hourly?.time ||
      !weather?.hourly?.temperature_2m ||
      !weather?.hourly?.weather_code
    ) {
      return [];
    }

    const times = weather.hourly.time;

    /*
      پیدا کردن اولین ساعت از امروز که برابر
      یا بعد از ساعت فعلی است
    */
    let currentIndex = times.findIndex((time) => {
      const date = time.slice(0, 10);
      const hour = Number(time.slice(11, 13));

      return date === currentDate && hour === currentHour;
    });

    /*
      اگر ساعت فعلی در اطلاعات API پیدا نشد،
      نزدیک‌ترین ساعت بعدی را پیدا می‌کنیم.
    */
    if (currentIndex === -1) {
      currentIndex = times.findIndex((time) => {
        const date = time.slice(0, 10);
        const hour = Number(time.slice(11, 13));

        return date === currentDate && hour >= currentHour;
      });
    }

    /*
      اگر باز هم پیدا نشد، از ساعت اول شروع می‌کنیم
    */
    if (currentIndex === -1) {
      currentIndex = 0;
    }

    /*
      از ساعت فعلی تا 23 ساعت بعد
      یعنی در مجموع 24 ساعت
    */
    return times.slice(currentIndex, currentIndex + 24).map((time, index) => {
      const realIndex = currentIndex + index;
      const code = weather.hourly.weather_code[realIndex];

      const hour = Number(time.slice(11, 13));
      const isCurrentHour =
        time.slice(0, 10) === currentDate && hour === currentHour;

      return {
        time: time.slice(11, 16),
        temp: `${Math.round(weather.hourly.temperature_2m[realIndex])}°`,
        code,
        icon: getWeatherIcon(code, time),
        condition: getWeatherText(code, time),
        isCurrentHour,
      };
    });
  }, [weather, currentDate, currentHour]);

  /*
    وضعیت فلش‌ها
  */
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

  /*
    فلش قبلی
  */
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  /*
    فلش بعدی
  */
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (!weather || hourlyData.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      {/* عنوان */}
      <div className="mb-5">
        <h2
          className="
          text-xl
          font-bold
          text-gray-800
          dark:text-white
          "
        >
          پیش‌بینی ساعتی {city}
        </h2>
      </div>

      {/* اسلایدر */}
      <div className="relative">
        {/* فلش سمت چپ */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="ساعات قبلی"
          className={`
            hidden
            lg:flex
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            -translate-x-1/2
            z-20
            w-12
            h-12
            rounded-full
            items-center
            justify-center
            border
            shadow-xl
            transition-all
            duration-300

            ${
              canPrev
                ? `
                  bg-white
                  dark:bg-slate-800
                  border-gray-200
                  dark:border-slate-700
                  hover:scale-110
                  hover:shadow-2xl
                  cursor-pointer
                `
                : `
                  bg-gray-100
                  dark:bg-slate-800
                  border-gray-200
                  dark:border-slate-700
                  opacity-40
                  cursor-not-allowed
                `
            }
          `}
        >
          <Icon
            icon="solar:alt-arrow-left-bold"
            className="
            text-2xl
            text-yellow-600
            dark:text-yellow-400
            "
          />
        </button>

        {/* فلش سمت راست */}
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="ساعات بعدی"
          className={`
            hidden
            lg:flex
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            translate-x-1/2
            z-20
            w-12
            h-12
            rounded-full
            items-center
            justify-center
            border
            shadow-xl
            transition-all
            duration-300

            ${
              canNext
                ? `
                  bg-white
                  dark:bg-slate-800
                  border-gray-200
                  dark:border-slate-700
                  hover:scale-110
                  hover:shadow-2xl
                  cursor-pointer
                `
                : `
                  bg-gray-100
                  dark:bg-slate-800
                  border-gray-200
                  dark:border-slate-700
                  opacity-40
                  cursor-not-allowed
                `
            }
          `}
        >
          <Icon
            icon="solar:alt-arrow-right-bold"
            className="
            text-2xl
            text-yellow-600
            dark:text-yellow-400
            "
          />
        </button>

        {/* ناحیه اسلایدر */}
        <div
          ref={emblaRef}
          className="
          overflow-hidden
          px-1
          cursor-grab
          active:cursor-grabbing
          "
        >
          <div className="flex mb-2">
            {hourlyData.map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className="
                flex-[0_0_50%]
                sm:flex-[0_0_33.333%]
                md:flex-[0_0_25%]
                lg:flex-[0_0_16.666%]
                px-2
                "
              >
                <div
                  className={`
                    h-full
                    min-h-52
                    rounded-3xl
                    border
                    shadow-sm
                    p-5
                    text-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    mt-1
                  ${
                    item.isCurrentHour
                      ? `
                        bg-white
                        dark:bg-slate-800
                        border-gray-100
                        dark:border-slate-700
                        shadow-md
                      `
                      : `
                        bg-slate-50
                        dark:bg-slate-800
                        border-gray-100
                        dark:border-slate-700
                        hover:border-yellow-200
                        dark:hover:border-yellow-500/30
                       `
                  }
                  `}
                >
                  {/* ساعت */}
                  <p
                    className={`
                      text-sm
                      font-bold
                      ${
                        item.isCurrentHour
                          ? `
                            text-yellow-600
                            dark:text-yellow-400
                          `
                          : `
                            text-gray-500
                            dark:text-gray-400
                          `
                      }
                    `}
                  >
                    {item.isCurrentHour ? "اکنون" : item.time}
                  </p>

                  {/* آیکن وضعیت هوا */}
                  <Icon
                    icon={item.icon}
                    className="
                    text-5xl
                    text-yellow-500
                    mx-auto
                    my-4
                    "
                  />

                  {/* وضعیت هوا */}
                  <p
                    className="
                    text-sm
                    font-semibold
                    text-gray-600
                    dark:text-gray-300
                    min-h-5
                    "
                  >
                    {item.condition}
                  </p>

                  {/* دما */}
                  <h3
                    className="
                    mt-3
                    text-2xl
                    font-bold
                    text-gray-800
                    dark:text-white
                    "
                  >
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

export default HourlyForecast;
