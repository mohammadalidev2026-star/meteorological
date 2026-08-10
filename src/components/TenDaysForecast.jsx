import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ForecastDay from "./ForecastDay";
import { Icon } from "@iconify/react";

const forecast = [
  {
    day: "یکشنبه",
    icon: "solar:sun-bold-duotone",
    min: "10°",
    max: "40°",
    sunrise: "05:30",
    sunset: "19:45",
    humidity: "12%",
    wind: "12 km/h",
    feels: "26°",
    description: "آسمان صاف و آفتابی",
  },
  {
    day: "دوشنبه",
    icon: "solar:cloud-sun-bold-duotone",
    min: "12°",
    max: "37°",
    sunrise: "05:31",
    sunset: "19:44",
    humidity: "18%",
    wind: "15 km/h",
    feels: "28°",
    description: "کمی ابری همراه با آفتاب",
  },
  {
    day: "سه‌شنبه",
    icon: "solar:cloud-bold-duotone",
    min: "14°",
    max: "35°",
    sunrise: "05:32",
    sunset: "19:43",
    humidity: "22%",
    wind: "10 km/h",
    feels: "27°",
    description: "هوای نیمه ابری",
  },
  {
    day: "چهارشنبه",
    icon: "solar:cloud-rain-bold-duotone",
    min: "16°",
    max: "32°",
    sunrise: "05:33",
    sunset: "19:42",
    humidity: "30%",
    wind: "18 km/h",
    feels: "25°",
    description: "احتمال بارندگی",
  },
  {
    day: "پنج‌شنبه",
    icon: "solar:sun-bold-duotone",
    min: "13°",
    max: "38°",
    sunrise: "05:34",
    sunset: "19:41",
    humidity: "15%",
    wind: "11 km/h",
    feels: "29°",
    description: "صاف و گرم",
  },
  {
    day: "جمعه",
    icon: "solar:cloud-sun-bold-duotone",
    min: "15°",
    max: "36°",
    sunrise: "05:35",
    sunset: "19:40",
    humidity: "20%",
    wind: "14 km/h",
    feels: "27°",
    description: "کمی ابری",
  },
  {
    day: "شنبه",
    icon: "solar:cloud-bold-duotone",
    min: "11°",
    max: "33°",
    sunrise: "05:36",
    sunset: "19:39",
    humidity: "25%",
    wind: "9 km/h",
    feels: "24°",
    description: "هوای آرام",
  },
  {
    day: "یکشنبه",
    icon: "solar:sun-bold-duotone",
    min: "9°",
    max: "39°",
    sunrise: "05:37",
    sunset: "19:38",
    humidity: "14%",
    wind: "13 km/h",
    feels: "28°",
    description: "آفتابی",
  },
  {
    day: "دوشنبه",
    icon: "solar:cloud-rain-bold-duotone",
    min: "12°",
    max: "30°",
    sunrise: "05:38",
    sunset: "19:37",
    humidity: "35%",
    wind: "20 km/h",
    feels: "23°",
    description: "بارندگی پراکنده",
  },
  {
    day: "سه‌شنبه",
    icon: "solar:sun-bold-duotone",
    min: "14°",
    max: "37°",
    sunrise: "05:39",
    sunset: "19:36",
    humidity: "17%",
    wind: "12 km/h",
    feels: "28°",
    description: "صاف",
  },
];

const hourlyData = Array.from({ length: 24 }, (_, index) => ({
  time: `${String(index).padStart(2, "0")}:00`,
  temp: `${20 + Math.floor(Math.random() * 13)}°`,
  icon: index < 6 ? "solar:cloud-bold-duotone" : "solar:sun-bold-duotone",
}));

function TenDaysForecast() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showForecast, setShowForecast] = useState(false);

  return (
    <section className="mt-8">
      <button
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
        <div className="flex items-center gap-3">
          <div
            className="
            w-12
            h-12
            rounded-2xl
            bg-yellow-100
            dark:bg-yellow-500/10
            flex
            items-center
            justify-center
            "
          >
            <Icon
              icon="solar:calendar-bold-duotone"
              className="text-3xl text-yellow-500"
            />
          </div>

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
        </div>

        <Icon
          icon={
            showForecast
              ? "solar:alt-arrow-up-bold"
              : "solar:alt-arrow-down-bold"
          }
          className="text-3xl text-yellow-500"
        />
      </button>

      <div
        className={`
        overflow-hidden
        transition-all
        duration-500

        ${
          showForecast ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0"
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
              key={index}
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

function DayWeather({ item, index, selectedDay, setSelectedDay }) {
  const [hourEmblaRef, hourEmblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
  });

  const [hourPrev, setHourPrev] = useState(false);
  const [hourNext, setHourNext] = useState(false);

  const checkButtons = useCallback(() => {
    if (!hourEmblaApi) return;

    setHourPrev(hourEmblaApi.canScrollPrev());
    setHourNext(hourEmblaApi.canScrollNext());
  }, [hourEmblaApi]);

  useEffect(() => {
    if (!hourEmblaApi) return;

    checkButtons();

    hourEmblaApi.on("select", checkButtons);
    hourEmblaApi.on("reInit", checkButtons);

    return () => {
      hourEmblaApi.off("select", checkButtons);
      hourEmblaApi.off("reInit", checkButtons);
    };
  }, [hourEmblaApi, checkButtons]);

  const open = selectedDay === index;

  return (
    <div className={open ? "bg-yellow-50 dark:bg-yellow-500/10" : ""}>
      <div onClick={() => setSelectedDay(open ? null : index)}>
        <ForecastDay
          day={item.day}
          icon={item.icon}
          min={item.min}
          max={item.max}
          open={open}
        />
      </div>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500

          ${open ? "max-h-[2500px] opacity-100" : "max-h-0 opacity-0"}
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

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {item.description}
          </p>

          <div className="grid md:grid-cols-3 gap-4">
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

          <div className="grid grid-cols-2 gap-4 mt-5">
            <InfoBox title="طلوع آفتاب" value={item.sunrise} />

            <InfoBox title="غروب آفتاب" value={item.sunset} />
          </div>

          <div className="mt-8">
            <h4
              className="
                font-bold
                text-xl
                text-gray-800
                dark:text-white
                mb-5
                "
            >
              پیش‌بینی ساعتی
            </h4>

            <div className="relative">
              {/* فلش قبلی */}
              <button
                onClick={() => hourEmblaApi?.scrollPrev()}
                disabled={!hourPrev}
                className={`
                  hidden lg:flex
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

      ${
        hourPrev
          ? "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
          : "bg-gray-200 dark:bg-slate-700 border-gray-600"
      }
    `}
              >
                <Icon
                  icon="solar:alt-arrow-left-bold"
                  className={`
        text-2xl
        ${hourPrev ? "text-yellow-600" : "text-gray-400"}
      `}
                />
              </button>

              {/* فلش بعدی */}
              <button
                onClick={() => hourEmblaApi?.scrollNext()}
                disabled={!hourNext}
                className={`
                  hidden lg:flex
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

      ${
        hourNext
          ? "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
          : "bg-gray-200 dark:bg-slate-700 border-gray-600"
      }
    `}
              >
                <Icon
                  icon="solar:alt-arrow-right-bold"
                  className={`
                    text-2xl
                    ${hourNext ? "text-yellow-600" : "text-gray-400"}
                  `}
                />
              </button>

              {/* لیست ساعت‌ها */}
              <div
                ref={hourEmblaRef}
                className="
                  overflow-hidden
                  cursor-grab
                  active:cursor-grabbing
                  "
              >
                <div className="flex">
                  {hourlyData.map((hour) => (
                    <div
                      key={hour.time}
                      className="
                        flex-[0_0_34%]
                        sm:flex-[0_0_30%]
                        md:flex-[0_0_25%]
                        lg:flex-[0_0_16.666%]
                        px-2
                      "
                    >
                      <div
                        className="
                          bg-white
                          dark:bg-slate-800
                          rounded-3xl
                          border
                          border-gray-100
                          dark:border-slate-700
                          shadow-sm
                          p-2 sm:p-4
                          text-center
                          hover:-translate-y-1
                          hover:shadow-lg
                          transition-all
                          duration-300
                          mt-1
                          "
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {hour.time}
                        </p>

                        <Icon
                          icon={hour.icon}
                          className="
                            text-3xl sm:text-5xl
                            text-yellow-500
                            mx-auto
                            my-4
                            "
                        />

                        <h3
                          className="
                            text-2xl
                            font-bold
                            text-gray-800
                            dark:text-white
                            "
                        >
                          {hour.temp}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-800
      rounded-3xl
      p-5
      flex
      items-center
      justify-between
      shadow-sm
      border
      border-gray-100
      dark:border-slate-700
      "
    >
      <div>
        <p className="text-gray-400 text-sm">{title}</p>

        <p className="font-bold text-xl dark:text-white">{value}</p>
      </div>

      <Icon icon={icon} className="text-4xl text-yellow-500" />
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-800
      rounded-3xl
      p-5
      border
      border-gray-100
      dark:border-slate-700
      "
    >
      <p className="text-gray-400">{title}</p>

      <p className="font-bold text-yellow-600">{value}</p>
    </div>
  );
}

export default TenDaysForecast;
