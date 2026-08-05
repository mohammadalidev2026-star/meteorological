import { Icon } from "@iconify/react";
import weatherData from "../data/weatherData";

function WeatherStats({ city = "هرات" }) {
  const weather =
    weatherData.find((item) => item.city === city) || weatherData[0];

  const stats = [
    {
      title: "رطوبت",
      value: weather.humidity,
      icon: "solar:waterdrops-bold-duotone",
    },

    {
      title: "سرعت باد",
      value: weather.wind,
      icon: "solar:wind-bold-duotone",
    },

    {
      title: "احساس دما",
      value: weather.feels,
      icon: "solar:temperature-bold-duotone",
    },
  ];

  return (
    <section
      className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      "
    >
      {stats.map((item) => (
        <div
          key={item.title}
          className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-gray-100
          dark:border-slate-700
          shadow-sm
          p-6
          hover:-translate-y-1
          hover:shadow-xl
          transition-all
          duration-300
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
            "
          >
            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-yellow-100
              dark:bg-yellow-500/10
              flex
              items-center
              justify-center
              "
            >
              <Icon
                icon={item.icon}
                className="
                text-4xl
                text-yellow-500
                "
              />
            </div>
          </div>

          <p
            className="
            mt-6
            text-gray-500
            dark:text-gray-400
            "
          >
            {item.title}
          </p>

          <h2
            className="
            mt-2
            text-3xl
            font-bold
            text-gray-800
            dark:text-white
            "
          >
            {item.value}
          </h2>
        </div>
      ))}
    </section>
  );
}

export default WeatherStats;
