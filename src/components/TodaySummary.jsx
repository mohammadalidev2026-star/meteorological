import { Icon } from "@iconify/react";
import weatherData from "../data/weatherData";

function TodaySummary({ city = "هرات" }) {
  const weather =
    weatherData.find((item) => item.city === city) || weatherData[0];

  const summary = [
    {
      title: "طلوع آفتاب",
      value: weather.sunrise,
      icon: "solar:sunrise-bold-duotone",
    },

    {
      title: "غروب آفتاب",
      value: weather.sunset,
      icon: "solar:sunset-bold-duotone",
    },

    {
      title: "وضعیت امروز",
      value: weather.condition,
      icon: weather.icon,
    },
  ];

  return (
    <section
      className="
      bg-white
      dark:bg-slate-900
      rounded-3xl
      border
      border-gray-100
      dark:border-slate-700
      shadow-sm
      p-6
      transition-all
      duration-300
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        text-gray-800
        dark:text-white
        mb-6
        "
      >
        خلاصه وضعیت امروز {city}
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        "
      >
        {summary.map((item) => (
          <div
            key={item.title}
            className="
            rounded-2xl
            bg-slate-50
            dark:bg-slate-800
            p-5
            flex
            items-center
            gap-4
            "
          >
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
                icon={item.icon}
                className="
                text-3xl
                text-yellow-500
                "
              />
            </div>

            <div>
              <p
                className="
                text-sm
                text-gray-500
                dark:text-gray-400
                "
              >
                {item.title}
              </p>

              <p
                className="
                text-lg
                font-bold
                text-gray-800
                dark:text-white
                mt-1
                "
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TodaySummary;
