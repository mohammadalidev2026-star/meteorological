import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import weatherData from "../data/weatherData";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  function removeCity(cityName) {
    const updatedFavorites = favorites.filter((item) => item.city !== cityName);

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function openCity(city) {
    localStorage.setItem("selectedCity", city);

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
        max-w-6xl
        mx-auto
        space-y-8
        "
      >
        {/* Header */}

        <section
          className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-gray-100
          dark:border-slate-700
          shadow-sm
          p-8
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              w-16
              h-16
              rounded-3xl
              bg-yellow-100
              dark:bg-yellow-500/10
              flex
              items-center
              justify-center
              "
            >
              <Icon
                icon="solar:star-bold-duotone"
                className="
                text-5xl
                text-yellow-500
                "
              />
            </div>

            <div>
              <h1
                className="
                text-3xl
                font-bold
                text-gray-800
                dark:text-white
                "
              >
                شهرهای مورد علاقه
              </h1>

              <p
                className="
                text-gray-500
                dark:text-gray-400
                mt-2
                "
              >
                شهرهای ذخیره شده شما
              </p>
            </div>
          </div>
        </section>

        {favorites.length === 0 ? (
          <section
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            shadow-sm
            p-10
            text-center
            "
          >
            <Icon
              icon="solar:star-fall-bold-duotone"
              className="
              text-7xl
              text-yellow-500
              mx-auto
              mb-5
              "
            />

            <h2
              className="
              text-2xl
              font-bold
              text-gray-800
              dark:text-white
              "
            >
              هنوز شهری اضافه نشده است
            </h2>
          </section>
        ) : (
          <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            "
          >
            {favorites.map((city) => {
              const weather =
                weatherData.find((item) => item.city === city.city) || {};

              return (
                <div
                  key={city.city}
                  onClick={() => openCity(city.city)}
                  className="
                  cursor-pointer
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
                        icon={weather.icon || "solar:star-bold-duotone"}
                        className="
                        text-4xl
                        text-yellow-500
                        "
                      />
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        removeCity(city.city);
                      }}
                      className="
                      w-11
                      h-11
                      rounded-xl
                      bg-red-50
                      dark:bg-red-500/10
                      flex
                      items-center
                      justify-center
                      hover:scale-110
                      transition-all
                      "
                    >
                      <Icon
                        icon="
                        solar:trash-bin-trash-bold-duotone
                        "
                        className="
                        text-2xl
                        text-red-500
                        "
                      />
                    </button>
                  </div>

                  <h2
                    className="
                    text-2xl
                    font-bold
                    text-gray-800
                    dark:text-white
                    mt-6
                    "
                  >
                    {city.city}
                  </h2>

                  <p
                    className="
                    text-gray-500
                    dark:text-gray-400
                    mt-2
                    "
                  >
                    {weather.condition || "آب‌وهوای امروز"}
                  </p>

                  <div
                    className="
                    mt-8
                    flex
                    items-center
                    justify-between
                    "
                  >
                    <span
                      className="
                      text-gray-500
                      dark:text-gray-400
                      "
                    >
                      دما
                    </span>

                    <span
                      className="
                      text-3xl
                      font-bold
                      text-yellow-500
                      "
                    >
                      {weather.temperature || "--°"}
                    </span>
                  </div>

                  <div
                    className="
                    mt-5
                    text-sm
                    text-yellow-500
                    "
                  >
                    برای مشاهده آب‌وهوا کلیک کنید
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Favorites;
