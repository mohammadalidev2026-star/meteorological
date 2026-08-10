import { useEffect, useMemo, useState } from "react";

import afghanistanCities from "../data/afghanistanCities";
import { getWeather } from "../services/weatherApi";

import HeroWeather from "../components/HeroWeather";
import WeatherStats from "../components/WeatherStats";
import TodaySummary from "../components/TodaySummary";
import HourlyForecast from "../components/HourlyForecast";
import TenDaysForecast from "../components/TenDaysForecast";
import SearchCity from "../components/SearchCity";

function Home() {
  const [selectedCity, setSelectedCity] = useState(() => {
    const savedCity = localStorage.getItem("selectedCity");

    if (
      savedCity &&
      afghanistanCities.some((city) => city.name === savedCity)
    ) {
      return savedCity;
    }

    return "هرات";
  });

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const currentCity = useMemo(() => {
    return (
      afghanistanCities.find((city) => city.name === selectedCity) ||
      afghanistanCities[0]
    );
  }, [selectedCity]);

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      setLoading(true);
      setError(false);
      setWeather(null);

      try {
        const data = await getWeather(currentCity.lat, currentCity.lon);

        if (!cancelled) {
          setWeather(data);
        }
      } catch (error) {
        console.error("Weather API Error:", error);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [currentCity]);

  function changeCity(city) {
    const cityExists = afghanistanCities.some((item) => item.name === city);

    if (!cityExists) {
      return;
    }

    setSelectedCity(city);
  }

  void changeCity;

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-50
          dark:bg-slate-950
          px-4
          py-8
          transition-colors
          duration-500
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            min-h-[60vh]
            flex
            items-center
            justify-center
          "
        >
          <div className="text-center">
            {/* انیمیشن Loading */}

            <div
              className="
                mx-auto
                mb-6
                w-14
                h-14
                rounded-full
                border-4
                border-yellow-200
                dark:border-slate-700
                border-t-yellow-500
                dark:border-t-blue-400
                animate-spin
              "
            />

            <p
              className="
                text-xl
                font-bold
                text-gray-700
                dark:text-white
              "
            >
              در حال دریافت اطلاعات هواشناسی...
            </p>

            <p
              className="
                mt-2
                text-gray-500
                dark:text-gray-400
              "
            >
              لطفاً چند لحظه صبر کنید
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !weather) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-50
          dark:bg-slate-950
          px-4
          py-8
          transition-colors
          duration-500
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            min-h-[60vh]
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              dark:bg-slate-900
              rounded-3xl
              border
              border-gray-100
              dark:border-slate-700
              shadow-xl
              p-8
              text-center
            "
          >
            {/* آیکن خطا */}

            <div
              className="
                mx-auto
                w-16
                h-16
                rounded-full
                bg-red-100
                dark:bg-red-500/10
                flex
                items-center
                justify-center
                text-2xl
                text-red-500
                font-bold
              "
            >
              !
            </div>

            <h2
              className="
                mt-5
                text-2xl
                font-bold
                text-gray-800
                dark:text-white
              "
            >
              دریافت اطلاعات ناموفق بود
            </h2>

            <p
              className="
                mt-3
                text-gray-500
                dark:text-gray-400
                leading-7
              "
            >
              اتصال به سرویس هواشناسی با مشکل مواجه شد.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-6
                px-6
                py-3
                rounded-2xl
                bg-yellow-500
                hover:bg-yellow-600
                dark:bg-blue-600
                dark:hover:bg-blue-700
                text-white
                font-bold
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
              "
            >
              تلاش دوباره
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
      min-h-screen
      bg-slate-50
      dark:bg-slate-950
      px-4
      py-8
      transition-colors
      duration-500
    "
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <SearchCity onSelect={changeCity} />

        <HeroWeather city={selectedCity} weather={weather} />

        <WeatherStats weather={weather} />

        <TodaySummary city={selectedCity} weather={weather} />

        <HourlyForecast city={selectedCity} weather={weather} />

        <TenDaysForecast city={selectedCity} weather={weather} />
      </div>
    </main>
  );
}

export default Home;
