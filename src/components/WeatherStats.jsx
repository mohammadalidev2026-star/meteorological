import { Icon } from "@iconify/react";

function WeatherStats({ weather }) {
  if (!weather?.current) {
    return null;
  }

  const stats = [
    {
      title: "رطوبت",
      value:
        weather.current.relative_humidity_2m != null
          ? `${Math.round(weather.current.relative_humidity_2m)}%`
          : "—",
      icon: "solar:waterdrops-bold-duotone",
    },

    {
      title: "سرعت باد",
      value:
        weather.current.wind_speed_10m != null
          ? `${Math.round(weather.current.wind_speed_10m)} km/h`
          : "—",
      icon: "solar:wind-bold-duotone",
    },

    {
      title: "احساس دما",
      value:
        weather.current.apparent_temperature != null
          ? `${Math.round(weather.current.apparent_temperature)}°`
          : "—",
      icon: "solar:temperature-bold-duotone",
    },
  ];

  return (
    <section className="w-full">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-5
        "
      >
        {stats.map((item) => (
          <div
            key={item.title}
            className="
              group
              bg-white
              dark:bg-slate-900
              rounded-3xl
              border
              border-gray-100
              dark:border-slate-700
              shadow-sm
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-yellow-200
              dark:hover:border-yellow-500/30
            "
          >
            {/* آیکن */}

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
                transition-all
                duration-300
                group-hover:scale-105
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

            {/* عنوان */}

            <p
              className="
                mt-6
                text-sm
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              {item.title}
            </p>

            {/* مقدار */}

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
      </div>
    </section>
  );
}

export default WeatherStats;
