import { useEffect, useState } from "react";

import SearchCity from "../components/SearchCity";
import HeroWeather from "../components/HeroWeather";
import WeatherStats from "../components/WeatherStats";
import TodaySummary from "../components/TodaySummary";
import HourlyForecast from "../components/HourlyForecast";
import TenDaysForecast from "../components/TenDaysForecast";

function Home() {
  const [selectedCity, setSelectedCity] = useState("هرات");

  // گرفتن شهر انتخاب شده از Favorites

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");

    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  function changeCity(city) {
    setSelectedCity(city);

    localStorage.setItem("selectedCity", city);
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
      duration-300
      "
    >
      <div
        className="
        max-w-6xl
        mx-auto
        space-y-8
        "
      >
        {/* Search */}

        <SearchCity onSelect={changeCity} />

        {/* Weather */}

        <HeroWeather city={selectedCity} />

        <WeatherStats city={selectedCity} />

        <TodaySummary city={selectedCity} />

        <HourlyForecast city={selectedCity} />

        <TenDaysForecast city={selectedCity} />
      </div>
    </main>
  );
}

export default Home;
