import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ForecastDay from "./ForecastDay";
import { Icon } from "@iconify/react";
import weatherData from "../data/weatherData";

function TenDaysForecast({ city = "هرات" }) {
  const currentWeather =
    weatherData.find((item) => item.city === city) || weatherData[0];

  const forecast = currentWeather.forecast10Days || [];

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

        ${
          showForecast
            ? "max-h-[5000px] opacity-100 mt-5"
            : "max-h-0 opacity-100"
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

          <p
            className="
            text-gray-500
            dark:text-gray-400
            mb-6
            "
          >
            {item.description}
          </p>

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

            <div
              ref={hourEmblaRef}
              className="
              overflow-hidden
              cursor-grab
              active:cursor-grabbing
              "
            >
              <div className="flex">
                {(item.hourly || []).map((hour) => (
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
                      p-4
                      text-center
                      hover:-translate-y-1
                      hover:shadow-lg
                      transition-all
                      "
                    >
                      <p
                        className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                        "
                      >
                        {hour.time}
                      </p>

                      <Icon
                        icon={hour.icon}
                        className="
                        text-4xl
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

        <p
          className="
          font-bold
          text-xl
          dark:text-white
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

      <p
        className="
        font-bold
        text-yellow-600
        "
      >
        {value}
      </p>
    </div>
  );
}

export default TenDaysForecast;
