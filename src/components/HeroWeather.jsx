import { Icon } from "@iconify/react";

function getWeatherIcon(code, time) {
  const hour = time ? Number(time.slice(11, 13)) : 12;

  if (code === 0) {
    if (hour >= 19 || hour < 6) {
      return "solar:moon-bold-duotone";
    }

    return "solar:sun-bold-duotone";
  }

  if ([1, 2].includes(code)) {
    return "solar:cloud-sun-bold-duotone";
  }

  if (code === 3) {
    return "solar:cloud-bold-duotone";
  }

  if ([45, 48].includes(code)) {
    return "solar:cloud-fog-bold-duotone";
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "solar:cloud-rain-bold-duotone";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "solar:cloud-snow-bold-duotone";
  }

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

  if (code === 0) {
    if (hour >= 19 || hour < 6) {
      return "صاف";
    }

    return "آفتابی";
  }

  if ([1, 2].includes(code)) {
    return "کمی ابری";
  }

  if (code === 3) {
    return "ابری";
  }

  if ([45, 48].includes(code)) {
    return "مه";
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "بارانی";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "برفی";
  }

  if ([95, 96, 99].includes(code)) {
    return "طوفانی";
  }

  return "نامشخص";
}

/* =========================================
   Hero Weather
========================================= */

function HeroWeather({ city = "هرات", weather }) {
  if (!weather?.current) {
    return null;
  }

  const temperature =
    weather.current.temperature_2m != null
      ? `${Math.round(weather.current.temperature_2m)}°`
      : "—";

  const weatherCode = weather.current.weather_code;

  const currentTime = weather.current.time || "";

  const condition = getWeatherText(weatherCode, currentTime);

  const icon = getWeatherIcon(weatherCode, currentTime);

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-4xl

        bg-gradient-to-br
        from-amber-400
        via-orange-400
        to-yellow-500

        dark:bg-gradient-to-br
        dark:from-slate-950
        dark:via-slate-900
        dark:to-blue-950

        text-white
        shadow-xl
        shadow-orange-200/40
        dark:shadow-black/40

        p-7
        md:p-10

        transition-all
        duration-500
      "
    >
      {/* =====================================
          نور و افکت Light Mode
      ====================================== */}

      <div
        className="
          absolute
          -top-24
          -right-24
          w-72
          h-72
          rounded-full
          bg-yellow-200/30
          blur-3xl

          dark:bg-blue-500/10
        "
      />

      <div
        className="
          absolute
          -bottom-28
          -left-24
          w-80
          h-80
          rounded-full
          bg-orange-200/20
          blur-3xl

          dark:bg-indigo-500/10
        "
      />

      {/* =====================================
          افکت مخصوص Dark Mode
      ====================================== */}

      <div
        className="
          hidden
          dark:block
          absolute
          top-10
          left-1/3
          w-40
          h-40
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* =====================================
          محتوای اصلی
      ====================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-10
        "
      >
        {/* =================================
            اطلاعات شهر
        ================================== */}

        <div className="text-center md:text-right">
          {/* شهر */}

          <div
            className="
              flex
              items-center
              justify-center
              md:justify-start
              gap-2
              mb-5
            "
          >
            <Icon
              icon="solar:location-bold-duotone"
              className="
                text-3xl
                text-yellow-100
                dark:text-blue-300
              "
            />

            <span
              className="
                text-lg
                md:text-xl
                font-medium
                text-white
              "
            >
              {city}، افغانستان
            </span>
          </div>

          {/* دما */}

          <h1
            className="
              text-7xl
              md:text-8xl
              font-black
              leading-none
              tracking-tight
              text-white
              drop-shadow-lg
            "
          >
            {temperature}
          </h1>

          {/* وضعیت */}

          <p
            className="
              mt-5
              text-2xl
              md:text-3xl
              font-semibold
              text-white/95
            "
          >
            {condition}
          </p>
        </div>

        {/* =================================
            آیکن وضعیت
        ================================== */}

        <div
          className="
            relative
            flex
            items-center
            justify-center
          "
        >
          {/* هاله Light */}

          <div
            className="
              absolute
              w-40
              h-40
              md:w-56
              md:h-56
              rounded-full

              bg-yellow-200/30

              blur-3xl
              scale-125

              dark:bg-blue-400/10
            "
          />

          {/* هاله Dark */}

          <div
            className="
              hidden
              dark:block
              absolute
              w-44
              h-44
              md:w-60
              md:h-60
              rounded-full
              bg-blue-400/10
              blur-3xl
            "
          />

          <Icon
            icon={icon}
            className="
              relative
              text-[150px]
              md:text-[200px]

              text-yellow-100

              dark:text-blue-300

              drop-shadow-[0_0_30px_rgba(255,255,255,0.20)]

              dark:drop-shadow-[0_0_35px_rgba(96,165,250,0.25)]

              transition-all
              duration-500
            "
          />
        </div>
      </div>
    </section>
  );
}

export default HeroWeather;
