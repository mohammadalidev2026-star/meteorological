import { useState } from "react";
import { Icon } from "@iconify/react";

const initialFavorites = [
  {
    id: 1,
    city: "هرات",
    temperature: "34°",
    condition: "آفتابی",
    icon: "solar:sun-bold-duotone",
  },
  {
    id: 2,
    city: "کابل",
    temperature: "27°",
    condition: "کمی ابری",
    icon: "solar:cloud-sun-bold-duotone",
  },
  {
    id: 3,
    city: "مزار شریف",
    temperature: "31°",
    condition: "صاف",
    icon: "solar:sun-bold-duotone",
  },
];

function Favorites() {
  const [favorites, setFavorites] = useState(initialFavorites);

  function removeCity(id) {
    setFavorites(favorites.filter((item) => item.id !== id));
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* عنوان */}

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
                icon="solar:heart-bold-duotone"
                className="text-5xl text-yellow-500"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                شهرهای مورد علاقه
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                وضعیت آب‌وهوای شهرهای ذخیره شده
              </p>
            </div>
          </div>
        </section>

        {/* اگر لیست خالی بود */}

        {favorites.length === 0 ? (
          <div
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            border
            border-gray-100
            dark:border-slate-700
            shadow-sm
            py-20
            px-6
            text-center
            "
          >
            <Icon
              icon="solar:heart-broken-bold-duotone"
              className="
              text-7xl
              text-yellow-500
              mx-auto
              mb-5
              "
            />

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              هیچ شهری ذخیره نشده است
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              شهرهای مورد علاقه خود را اضافه کنید.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((city) => (
              <div
                key={city.id}
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
                <div className="flex items-center justify-between">
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
                      icon={city.icon}
                      className="text-4xl text-yellow-500"
                    />
                  </div>

                  <button
                    onClick={() => removeCity(city.id)}
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
                      icon="solar:trash-bin-trash-bold-duotone"
                      className="text-2xl text-red-500"
                    />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-6">
                  {city.city}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {city.condition}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">دما</span>

                  <span className="text-3xl font-bold text-yellow-500">
                    {city.temperature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Favorites;
