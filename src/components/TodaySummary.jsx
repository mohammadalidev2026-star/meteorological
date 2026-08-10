import { Icon } from "@iconify/react";

function getWeatherIcon(code, time) {
  const hour = time ? Number(time.slice(11, 13)) : 12;

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

  // ابری
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
  const hour = time ? Number(time.slice(11, 13)) : 12;

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
   خلاصه وضعیت امروز
========================================= */

function TodaySummary({ city = "هرات", weather }) {
  if (!weather?.current || !weather?.daily) {
    return null;
  }

  const currentCode = weather.current.weather_code;

  const currentTime = weather.current.time || weather.daily.sunrise?.[0] || "";

  const summary = [
    {
      title: "طلوع آفتاب",

      value: weather.daily.sunrise?.[0]
        ? weather.daily.sunrise[0].slice(11, 16)
        : "--:--",

      icon: "solar:sunrise-bold-duotone",
    },

    {
      title: "غروب آفتاب",

      value: weather.daily.sunset?.[0]
        ? weather.daily.sunset[0].slice(11, 16)
        : "--:--",

      icon: "solar:sunset-bold-duotone",
    },

    {
      title: "وضعیت امروز",

      value: getWeatherText(currentCode, currentTime),

      icon: getWeatherIcon(currentCode, currentTime),
    },
  ];

  return (
    <section className="w-full">
      {/* =====================================
          عنوان
      ====================================== */}

      <div className="mb-5">
        <h2
          className="
            text-xl
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          خلاصه وضعیت امروز {city}
        </h2>
      </div>

      {/* =====================================
          کارت‌ها
      ====================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-5
        "
      >
        {summary.map((item) => (
          <div
            key={item.title}
            className="
              group
              rounded-3xl
              bg-white
              dark:bg-slate-900
              border
              border-gray-100
              dark:border-slate-700
              shadow-sm
              p-5
              flex
              items-center
              gap-4
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
                shrink-0
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

            {/* اطلاعات */}

            <div className="min-w-0">
              <p
                className="
                  text-sm
                  font-medium
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
                  truncate
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
