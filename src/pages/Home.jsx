import HeroWeather from "../components/HeroWeather";
import WeatherStats from "../components/WeatherStats";
import TodaySummary from "../components/TodaySummary";
import HourlyForecast from "../components/HourlyForecast";
import TenDaysForecast from "../components/TenDaysForecast";

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <HeroWeather />

        <WeatherStats />

        <TodaySummary />

        <HourlyForecast />

        <TenDaysForecast />
      </div>
    </main>
  );
}

export default Home;
