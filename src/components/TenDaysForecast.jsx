import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ForecastDay from "./ForecastDay";
import { Icon } from "@iconify/react";

function getWeatherIcon(code, time) {
  const hour = Number(time.slice(11, 13));

  // آسمان صاف
  if (code === 0) {
    // شب
    if (hour >= 19 || hour < 6) {
      return "solar:moon-bold-duotone";
    }

    // روز
    return "solar:sun-bold-duotone";
  }

  // کمی ابری
  if ([1, 2].includes(code)) {
    return "solar:cloud-sun-bold-duotone";
  }

  // کاملاً ابری
  if (code === 3) {
    return "solar:cloud-bold-duotone";
  }

  // مه
  if ([45, 48].includes(code)) {
    return "solar:cloud-fog-bold-duotone";
  }

  // باران
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "solar:cloud-rain-bold-duotone";
  }

  // برف
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "solar:cloud-snow-bold-duotone";
  }

  // طوفان
  if ([95, 96, 99].includes(code)) {
    return "solar:cloud-bolt-bold-duotone";
  }

  return "solar:cloud-bold-duotone";
}

/* =========================================
   متن وضعیت آب‌وهوا
========================================= */

function getWeatherText(code, time) {
  const hour = Number(time.slice(11, 13));

  // آسمان صاف
  if (code === 0) {
    if (hour >= 19 || hour < 6) {
      return "صاف";
    }

    return "آفتابی";
  }

  // کمی ابری
  if ([1, 2].includes(code)) {
    return "کمی ابری";
  }

  // ابری
  if (code === 3) {
    return "ابری";
  }

  // مه
  if ([45, 48].includes(code)) {
    return "مه";
  }

  // باران
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "بارانی";
  }

  // برف
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "برفی";
  }

  // طوفان
  if ([95, 96, 99].includes(code)) {
    return "طوفانی";
  }

  return "نامشخص";
}

/* =========================================
   نام روزهای هفته
========================================= */

const weekDays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

function getDayName(index, date) {
  if (index === 0) {
    return "امروز";
  }

  const day = new Date(`${date}T12:00:00`).getDay();

  return weekDays[day];
}

/* =========================================
   TenDaysForecast
========================================= */

function TenDaysForecast({ city = "هرات", weather }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showForecast, setShowForecast] = useState(false);

  /* -----------------------------------------
     بررسی اطلاعات API
  ----------------------------------------- */

  if (
    !weather ||
    !weather.daily ||
    !weather.hourly ||
    !weather.daily.time ||
    !weather.hourly.time
  ) {
    return null;
  }

  /* -----------------------------------------
     ساخت اطلاعات ۱۰ روز
  ----------------------------------------- */

  const forecast = useMemo(() => {
    return weather.daily.time.map((date, index) => {
      const dailyCode = weather.daily.weather_code?.[index] ?? 0;

      const hourly = weather.hourly.time
        .map((time, hourIndex) => {
          if (!time.startsWith(date)) {
            return null;
          }

          const code = weather.hourly.weather_code?.[hourIndex] ?? 0;

          return {
            id: `${date}-${hourIndex}`,

            time: time.slice(11, 16),

            temp:
              weather.hourly.temperature_2m?.[hourIndex] != null
                ? `${Math.round(weather.hourly.temperature_2m[hourIndex])}°`
                : "—",

            code,

            icon: getWeatherIcon(code, time),

            condition: getWeatherText(code, time),
          };
        })
        .filter(Boolean);

      return {
        date,

        day: getDayName(index, date),

        icon: getWeatherIcon(dailyCode, `${date}T12:00`),

        min:
          weather.daily.temperature_2m_min?.[index] != null
            ? `${Math.round(weather.daily.temperature_2m_min[index])}°`
            : "—",

        max:
          weather.daily.temperature_2m_max?.[index] != null
            ? `${Math.round(weather.daily.temperature_2m_max[index])}°`
            : "—",

        description: getWeatherText(dailyCode, `${date}T12:00`),

        humidity:
          weather.daily.relative_humidity_2m_max?.[index] != null
            ? `${Math.round(weather.daily.relative_humidity_2m_max[index])}%`
            : "—",

        wind:
          weather.daily.wind_speed_10m_max?.[index] != null
            ? `${Math.round(weather.daily.wind_speed_10m_max[index])} km/h`
            : "—",

        feels:
          weather.daily.apparent_temperature_max?.[index] != null
            ? `${Math.round(weather.daily.apparent_temperature_max[index])}°`
            : "—",

        sunrise: weather.daily.sunrise?.[index]
          ? weather.daily.sunrise[index].slice(11, 16)
          : "—",

        sunset: weather.daily.sunset?.[index]
          ? weather.daily.sunset[index].slice(11, 16)
          : "—",

        hourly,
      };
    });
  }, [weather]);

  return (
    <section className="w-full">
      {/* =====================================
          عنوان پیش‌بینی ۱۰ روز
      ====================================== */}

      <button
        type="button"
        onClick={() => setShowForecast(!showForecast)}
        className="
          w-full
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-gray-100
          dark:border-slate-700
          shadow-sm
          p-5
          flex
          items-center
          justify-between
          hover:shadow-lg
          transition-all
          duration-300
        "
      >
        <span
          className="
            text-xl
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          پیش‌بینی ۱۰ روز آینده
        </span>

        <Icon
          icon={
            showForecast
              ? "solar:alt-arrow-up-bold"
              : "solar:alt-arrow-down-bold"
          }
          className="
            text-3xl
            text-yellow-500
          "
        />
      </button>

      {/* =====================================
          لیست روزها
      ====================================== */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500

          ${
            showForecast
              ? "max-h-[8000px] opacity-100 mt-5"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            dark:border-slate-700
            overflow-hidden
          "
        >
          {forecast.map((item, index) => (
            <DayWeather
              key={`${item.date}-${index}`}
              item={item}
              index={index}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   جزئیات هر روز
========================================= */

function DayWeather({ item, index, selectedDay, setSelectedDay }) {
  const open = selectedDay === index;

  return (
    <div
      className={`
        transition-all
        duration-300

        ${open ? "bg-yellow-50 dark:bg-yellow-500/10" : ""}
      `}
    >
      {/* ردیف روز */}

      <div
        onClick={() => setSelectedDay(open ? null : index)}
        className="cursor-pointer"
      >
        <ForecastDay
          day={item.day}
          icon={item.icon}
          min={item.min}
          max={item.max}
          open={open}
        />
      </div>

      {/* جزئیات */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500

          ${open ? "max-h-[7000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div
          className="
            p-6
            border-t
            border-yellow-200
            dark:border-yellow-500/30
          "
        >
          {/* عنوان */}

          <h3
            className="
              text-2xl
              font-bold
              text-gray-800
              dark:text-white
              mb-2
            "
          >
            وضعیت آب‌وهوای روز {item.day}
          </h3>

          {/* وضعیت */}

          <p
            className="
              text-gray-500
              dark:text-gray-400
              mb-6
            "
          >
            {item.description}
          </p>

          {/* اطلاعات */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-4
            "
          >
            <InfoCard
              title="رطوبت"
              value={item.humidity}
              icon="solar:waterdrops-bold-duotone"
            />

            <InfoCard
              title="سرعت باد"
              value={item.wind}
              icon="solar:wind-bold-duotone"
            />

            <InfoCard
              title="احساس دما"
              value={item.feels}
              icon="solar:temperature-bold-duotone"
            />
          </div>

          {/* طلوع و غروب */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
              mt-5
            "
          >
            <InfoBox title="طلوع آفتاب" value={item.sunrise} />

            <InfoBox title="غروب آفتاب" value={item.sunset} />
          </div>

          {/* =================================
              پیش‌بینی ساعتی
          ================================== */}

          <DayHourlyForecast day={item.day} hourly={item.hourly} />
        </div>
      </div>
    </div>
  );
}

/* =========================================
   پیش‌بینی ساعتی داخل هر روز
   دقیقاً با ساختار HourlyForecast
========================================= */

function DayHourlyForecast({ day, hourly }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  /* وضعیت فلش‌ها */

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

  /* فلش قبلی */

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  /* فلش بعدی */

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (!hourly || hourly.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      {/* عنوان */}

      <div className="mb-5">
        <h4
          className="
            text-xl
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          پیش‌بینی ساعتی {day}
        </h4>
      </div>

      {/* اسلایدر */}

      <div className="relative">
        {/* =================================
            فلش سمت چپ
        ================================== */}

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

        {/* =================================
            فلش سمت راست
        ================================== */}

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

        {/* =================================
            ناحیه اسلایدر
        ================================== */}

        <div
          ref={emblaRef}
          className="
            overflow-hidden
            px-1
            cursor-grab
            active:cursor-grabbing
          "
        >
          <div className="flex">
            {hourly.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="
                  flex-[0_0_50%]
                  sm:flex-[0_0_33.333%]
                  md:flex-[0_0_25%]
                  lg:flex-[0_0_16.666%]
                  px-2
                "
              >
                <div
                  className="
                    h-full
                    min-h-52
                    bg-slate-50
                    dark:bg-slate-800
                    rounded-3xl
                    border
                    border-gray-100
                    dark:border-slate-700
                    shadow-sm
                    p-5
                    text-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:border-yellow-200
                    dark:hover:border-yellow-500/30
                  "
                >
                  {/* ساعت */}

                  <p
                    className="
                      text-sm
                      font-medium
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {item.time}
                  </p>

                  {/* آیکن */}

                  <Icon
                    icon={item.icon}
                    className="
                      text-5xl
                      text-yellow-500
                      mx-auto
                      my-4
                    "
                  />

                  {/* وضعیت */}

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
    </div>
  );
}

/* =========================================
   کارت اطلاعات
========================================= */

function InfoCard({ title, value, icon }) {
  return (
    <div
      className="
        bg-gray-50
        dark:bg-slate-800
        rounded-2xl
        border
        border-gray-100
        dark:border-slate-700
        p-4
        flex
        items-center
        justify-between
      "
    >
      <div>
        <p
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          {title}
        </p>

        <p
          className="
            text-xl
            font-bold
            text-gray-800
            dark:text-white
            mt-1
          "
        >
          {value}
        </p>
      </div>

      <Icon
        icon={icon}
        className="
          text-4xl
          text-yellow-500
        "
      />
    </div>
  );
}

/* =========================================
   طلوع و غروب
========================================= */

function InfoBox({ title, value }) {
  return (
    <div
      className="
        bg-gray-50
        dark:bg-slate-800
        rounded-2xl
        border
        border-gray-100
        dark:border-slate-700
        p-4
      "
    >
      <p
        className="
          text-sm
          text-gray-500
          dark:text-gray-400
        "
      >
        {title}
      </p>

      <p
        className="
          text-xl
          font-bold
          text-yellow-600
          dark:text-yellow-400
          mt-2
        "
      >
        {value}
      </p>
    </div>
  );
}

export default TenDaysForecast;
