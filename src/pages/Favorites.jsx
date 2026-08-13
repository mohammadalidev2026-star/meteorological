import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import afghanistanCities from "../data/afghanistanCities";
import { getWeather } from "../services/weatherApi";

function getWeatherIcon(code, time) {
  const hour = time ? Number(time.slice(11, 13)) : new Date().getHours();

  // Clear sky
  if (code === 0) {
    if (hour >= 19 || hour < 6) {
      return "solar:moon-bold-duotone";
    }

    return "solar:sun-bold-duotone";
  }

  // Mainly clear / partly cloudy
  if ([1, 2].includes(code)) {
    return "solar:cloud-sun-bold-duotone";
  }

  // Overcast
  if (code === 3) {
    return "solar:cloud-bold-duotone";
  }

  // Fog
  if ([45, 48].includes(code)) {
    return "solar:cloud-fog-bold-duotone";
  }

  // Rain
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return "solar:cloud-rain-bold-duotone";
  }

  // Snow
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "solar:cloud-snow-bold-duotone";
  }

  // Thunderstorm
  if ([95, 96, 99].includes(code)) {
    return "solar:cloud-bolt-bold-duotone";
  }

  return "solar:cloud-bold-duotone";
}

function getWeatherText(code) {
  if (code === 0) {
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

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  // شهر انتخاب‌شده برای حذف
  const [deleteCity, setDeleteCity] = useState(null);

  const navigate = useNavigate();

  /*
    دریافت شهرهای مورد علاقه
  */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favorites"));

      if (Array.isArray(saved)) {
        setFavorites(saved);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("خطا در خواندن شهرهای مورد علاقه:", error);

      setFavorites([]);
    }
  }, []);

  /*
    دریافت آب‌وهوای شهرهای مورد علاقه
  */
  useEffect(() => {
    if (favorites.length === 0) {
      setWeatherData({});
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadFavoritesWeather() {
      setLoading(true);

      const results = {};

      await Promise.all(
        favorites.map(async (favorite) => {
          const cityName = favorite.city;

          const city = afghanistanCities.find((item) => item.name === cityName);

          if (!city) {
            return;
          }

          try {
            const weather = await getWeather(city.lat, city.lon);

            if (!cancelled) {
              results[cityName] = weather;
            }
          } catch (error) {
            console.error(`خطا در دریافت آب‌وهوای ${cityName}:`, error);
          }
        }),
      );

      if (!cancelled) {
        setWeatherData(results);
        setLoading(false);
      }
    }

    loadFavoritesWeather();

    return () => {
      cancelled = true;
    };
  }, [favorites]);

  /*
    حذف شهر
    این تابع فقط زمانی اجرا می‌شود که
    کاربر روی «بله» کلیک کند.
  */
  function removeCity(cityName) {
    const updatedFavorites = favorites.filter((item) => item.city !== cityName);

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setWeatherData((previous) => {
      const updatedWeather = { ...previous };

      delete updatedWeather[cityName];

      return updatedWeather;
    });
  }

  /*
    باز کردن شهر
  */
  function openCity(cityName) {
    localStorage.setItem("selectedCity", cityName);

    window.dispatchEvent(new Event("cityChanged"));

    navigate("/");
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
        max-w-7xl
        mx-auto
        "
      >
        {/* Header */}
        <section className="mb-8">
          <div>
            <h1
              className="
              text-3xl
              font-extrabold
              text-slate-800
              dark:text-white
              "
            >
              شهرهای مورد علاقه
            </h1>

            <p
              className="
              text-slate-500
              dark:text-slate-400
              mt-2
              "
            >
              وضعیت فعلی شهرهای ذخیره‌شده شما
            </p>
          </div>
        </section>

        {/* Loading */}
        {loading && favorites.length > 0 && (
          <section
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-800
            shadow-sm
            p-10
            text-center
            "
          >
            <div
              className="
              mx-auto
              mb-5
              w-12
              h-12
              rounded-full
              border-4
              border-slate-200
              dark:border-slate-700
              border-t-yellow-500
              dark:border-t-blue-500
              animate-spin
              "
            />

            <p
              className="
              text-lg
              font-semibold
              text-slate-700
              dark:text-slate-200
              "
            >
              در حال دریافت اطلاعات شهرها...
            </p>

            <p
              className="
              mt-2
              text-sm
              text-slate-500
              dark:text-slate-400
              "
            >
              اطلاعات آب‌وهوا از API دریافت می‌شود
            </p>
          </section>
        )}

        {/* Empty */}
        {!loading && favorites.length === 0 && (
          <section
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-800
            shadow-sm
            p-10
            md:p-14
            text-center
            "
          >
            <div
              className="
              w-20
              h-20
              rounded-3xl
              bg-yellow-50
              dark:bg-blue-500/10
              flex
              items-center
              justify-center
              mx-auto
              mb-6
              "
            >
              <Icon
                icon="solar:star-fall-bold-duotone"
                className="
                text-5xl
                text-yellow-500
                dark:text-blue-400
                "
              />
            </div>

            <h2
              className="
              text-2xl
              font-bold
              text-slate-800
              dark:text-white
              "
            >
              هنوز شهری اضافه نشده است
            </h2>

            <p
              className="
              mt-3
              text-slate-500
              dark:text-slate-400
              "
            >
              شهرهای مورد علاقه خود را از بخش جستجو اضافه کنید.
            </p>
          </section>
        )}

        {/* Favorites */}
        {!loading && favorites.length > 0 && (
          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            "
          >
            {favorites.map((favorite) => {
              const cityWeather = weatherData[favorite.city];

              const current = cityWeather?.current;

              const temperature =
                current?.temperature_2m !== undefined
                  ? `${Math.round(current.temperature_2m)}°`
                  : "--°";

              const condition =
                current?.weather_code !== undefined
                  ? getWeatherText(current.weather_code)
                  : "اطلاعات در دسترس نیست";

              const icon =
                current?.weather_code !== undefined
                  ? getWeatherIcon(current.weather_code, current.time)
                  : "solar:cloud-bold-duotone";

              return (
                <div
                  key={favorite.city}
                  onClick={() => openCity(favorite.city)}
                  className="
                  group
                  cursor-pointer
                  bg-white
                  dark:bg-slate-900
                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-800
                  shadow-sm
                  p-6
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:border-yellow-200
                  dark:hover:border-blue-500/30
                  transition-all
                  duration-300
                  "
                >
                  {/* Top */}
                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    "
                  >
                    {/* Weather Icon */}
                    <div
                      className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-yellow-50
                      dark:bg-blue-500/10
                      border
                      border-yellow-100
                      dark:border-blue-500/20
                      flex
                      items-center
                      justify-center
                      group-hover:scale-105
                      transition-transform
                      duration-300
                      "
                    >
                      <Icon
                        icon={icon}
                        className="
                        text-4xl
                        text-yellow-600
                        dark:text-blue-400
                        "
                      />
                    </div>

                    {/* Delete Button */}
                    <button
                      type="button"
                      aria-label={`حذف ${favorite.city}`}
                      onClick={(event) => {
                        event.stopPropagation();

                        setDeleteCity(favorite.city);
                      }}
                      className="
                      w-11
                      h-11
                      rounded-xl
                      bg-yellow-50
                      dark:bg-blue-500/10
                      flex
                      items-center
                      justify-center
                      hover:bg-yellow-100
                      dark:hover:bg-blue-500/20
                      hover:scale-105
                      transition-all
                      duration-200
                      "
                    >
                      <Icon
                        icon="solar:trash-bin-trash-bold-duotone"
                        className="
                        text-2xl
                        text-yellow-500
                        dark:text-blue-400
                        "
                      />
                    </button>
                  </div>

                  {/* City */}
                  <h2
                    className="
                    text-2xl
                    font-bold
                    text-slate-800
                    dark:text-white
                    mt-6
                    "
                  >
                    {favorite.city}
                  </h2>

                  {/* Condition */}
                  <p
                    className="
                    text-slate-500
                    dark:text-slate-400
                    mt-2
                    "
                  >
                    {condition}
                  </p>

                  {/* Temperature */}
                  <div
                    className="
                    mt-8
                    flex
                    items-end
                    justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                        "
                      >
                        دمای فعلی
                      </p>

                      <p
                        className="
                        mt-1
                        text-4xl
                        font-extrabold
                        text-slate-800
                        dark:text-white
                        "
                      >
                        {temperature}
                      </p>
                    </div>

                    <Icon
                      icon={icon}
                      className="
                      text-5xl
                      text-yellow-600
                      dark:text-blue-400
                     
                      "
                    />
                  </div>

                  {/* Open */}
                  <div
                    className="
                    mt-6
                    pt-4
                    border-t
                    border-slate-100
                    dark:border-slate-800
                    flex
                    items-center
                    justify-between
                    "
                  >
                    <span
                      className="
                      text-sm
                      font-semibold
                      text-yellow-500
                      dark:text-blue-400
                      "
                    >
                      مشاهده آب‌وهوا
                    </span>

                    <Icon
                      icon="solar:arrow-left-bold"
                      className="
                      text-lg
                      text-yellow-500
                      dark:text-blue-400
                      group-hover:-translate-x-1
                      transition-transform
                      "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCity && (
        <div
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/40
          backdrop-blur-sm
          px-4
          "
          onClick={() => setDeleteCity(null)}
        >
          <div
            className="
            w-full
            max-w-md
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-800
            shadow-2xl
            p-7
            text-center
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Icon */}
            <div
              className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-yellow-50
              dark:bg-blue-500/10
              flex
              items-center
              justify-center
              "
            >
              <Icon
                icon="solar:trash-bin-trash-bold-duotone"
                className="
                text-3xl
                text-yellow-500
                dark:text-blue-400
                "
              />
            </div>

            {/* Title */}
            <h2
              className="
              mt-5
              text-xl
              font-bold
              text-slate-800
              dark:text-white
              "
            >
              آیا می‌خواهید این شهر را حذف کنید؟
            </h2>

            {/* Description */}
            <p
              className="
              mt-3
              text-slate-500
              dark:text-slate-400
              leading-7
              "
            >
              شهر «{deleteCity}» از شهرهای مورد علاقه شما حذف خواهد شد.
            </p>

            {/* Buttons */}
            <div
              className="
              mt-7
              flex
              gap-3
              "
            >
              {/* No */}
              <button
                type="button"
                onClick={() => setDeleteCity(null)}
                className="
                flex-1
                py-3
                rounded-2xl
                bg-slate-100
                dark:bg-slate-800
                text-slate-700
                dark:text-slate-200
                font-bold
                hover:bg-slate-200
                dark:hover:bg-slate-700
                transition-all
                duration-200
                "
              >
                خیر
              </button>

              {/* Yes */}
              <button
                type="button"
                onClick={() => {
                  removeCity(deleteCity);
                  setDeleteCity(null);
                }}
                className="
                flex-1
                py-3
                rounded-2xl
                bg-yellow-500
                dark:bg-blue-500
                text-white
                font-bold
                hover:bg-yellow-600
                dark:hover:bg-blue-600
                transition-all
                duration-200
                "
              >
                بله
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Favorites;
