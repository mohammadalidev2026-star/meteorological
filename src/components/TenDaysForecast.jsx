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

function TenDaysForecast() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showForecast, setShowForecast] = useState(false);

  function toggleDay(index) {
    setSelectedDay(selectedDay === index ? null : index);
  }
  return (
    <section className="mt-8">
      <button
        onClick={() => setShowForecast(!showForecast)}
        className="
      w-full
      bg-white
      rounded-3xl
      border
      border-gray-100
      shadow-sm
      p-5
      flex
      items-center
      justify-between
      hover:shadow-md
      transition-all
      "
      >
        <div className="flex items-center gap-3">
          <div
            className="
          w-12
          h-12
          rounded-2xl
          bg-yellow-100
          flex
          items-center
          justify-center
          "
          >
            <Icon
              icon="solar:calendar-bold-duotone"
              className="
            text-3xl
            text-yellow-500
            "
            />
          </div>

          <span
            className="
          text-xl
          font-bold
          text-gray-800
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
          className="
        text-3xl
        text-yellow-500
        "
        />
      </button>

      <div
        className={`
      overflow-hidden
      transition-all
      duration-500

      ${showForecast ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0"}

      `}
      >
        <div
          className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-gray-100
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
    containScroll: "trimSnaps",
    slidesToScroll: 1,
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

  function toggle() {
    setSelectedDay(selectedDay === index ? null : index);
  }

  return (
    <div className={selectedDay === index ? "bg-yellow-50" : ""}>
      <div onClick={toggle} className="cursor-pointer">
        <ForecastDay
          day={item.day}
          icon={item.icon}
          min={item.min}
          max={item.max}
          open={selectedDay === index}
        />
      </div>

      <div
        className={`
        overflow-hidden
        transition-all
        duration-500

        ${
          selectedDay === index
            ? "max-h-[2500px] opacity-100"
            : "max-h-0 opacity-0"
        }
        `}
      >
        <div
          className="
          p-6
          border-t
          border-yellow-200
          "
        >
          <h3
            className="
            text-2xl
            font-bold
            text-gray-800
            mb-2
            "
          >
            وضعیت آب‌وهوای روز {item.day}
          </h3>

          <p className="text-gray-500 mb-6">{item.description}</p>

          <div
            className="
            grid
            md:grid-cols-3
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

          <div
            className="
            grid
            grid-cols-2
            gap-4
            mt-5
            "
          >
            <InfoBox title="طلوع آفتاب" value={item.sunrise} />

            <InfoBox title="غروب آفتاب" value={item.sunset} />
          </div>

          <div className="mt-8">
            <div
              className="
              flex
              items-center
              gap-3
              mb-5
              "
            >
              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-yellow-100
                flex
                items-center
                justify-center
                "
              >
                <Icon
                  icon="solar:clock-circle-bold-duotone"
                  className="
                  text-3xl
                  text-yellow-500
                  "
                />
              </div>

              <h4
                className="
                font-bold
                text-xl
                "
              >
                پیش‌بینی ساعتی روز {item.day}
              </h4>
            </div>

            <div className="relative">
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

    ${hourPrev ? "bg-white border-gray-200" : "bg-gray-200 border-gray-200"}
  `}
              >
                <Icon
                  icon="solar:alt-arrow-left-bold"
                  className={
                    hourPrev
                      ? "text-2xl text-yellow-600"
                      : "text-2xl text-gray-400"
                  }
                />
              </button>

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

    ${hourNext ? "bg-white border-gray-200" : "bg-gray-200 border-gray-200"}
  `}
              >
                <Icon
                  icon="solar:alt-arrow-right-bold"
                  className={
                    hourNext
                      ? "text-2xl text-yellow-600"
                      : "text-2xl text-gray-400"
                  }
                />
              </button>

              <div
                ref={hourEmblaRef}
                className="
                overflow-hidden
                px-12
                cursor-grab
                active:cursor-grabbing
                "
              >
                <div className="flex">
                  {hourlyData.map((hour) => (
                    <div
                      key={hour.time}
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
                        <p className="text-sm text-gray-500">{hour.time}</p>

                        <Icon
                          icon={hour.icon}
                          className="
                          text-5xl
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
      rounded-3xl
      p-5
      flex
      items-center
      justify-between
      shadow-sm
      "
    >
      <div>
        <p className="text-gray-400 text-sm">{title}</p>

        <p className="font-bold text-xl">{value}</p>
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

function InfoBox({ title, value }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-5
      "
    >
      <p className="text-gray-400">{title}</p>

      <p className="font-bold text-yellow-600">{value}</p>
    </div>
  );
}

export default TenDaysForecast;
