import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import afghanistanCities from "../data/afghanistanCities";

function SearchCity({ onSelect }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(saved);
  }, []);

  const filteredCities = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return afghanistanCities.filter((city) =>
      city.name.toLowerCase().includes(value),
    );
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function selectCity(city) {
    if (!city) return;

    onSelect?.(city.name);

    localStorage.setItem("selectedCity", city.name);

    setSearch("");
    setOpen(false);
  }

  function toggleFavorite(city) {
    if (!city) return;

    const exists = favorites.some((item) => item.city === city.name);

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter((item) => item.city !== city.name);
    } else {
      updatedFavorites = [
        ...favorites,
        {
          city: city.name,
        },
      ];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function isFavorite(city) {
    return favorites.some((item) => item.city === city.name);
  }

  function clearSearch() {
    setSearch("");
    setOpen(false);
  }

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        w-full
      "
    >
      <div
        className="
          w-full
          h-14
          px-5
          rounded-3xl
          bg-white
          dark:bg-slate-900
          focus-within:border-2
          border
          border-gray-200
          dark:border-slate-700
          shadow-sm
          flex
          items-center
          gap-3
          transition-all
          duration-300
          focus-within:border-yellow-400
          dark:focus-within:border-blue-400
          focus-within:shadow-lg
        "
      >
        {/* Search Icon */}

        <Icon
          icon="solar:magnifer-bold-duotone"
          className="
            shrink-0

            text-2xl

            text-gray-400
            dark:text-gray-500
          "
        />

        {/* Input */}
        <input
          value={search}
          onFocus={() => {
            if (search.trim()) {
              setOpen(true);
            }
          }}
          onChange={(event) => {
            setSearch(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && filteredCities.length > 0) {
              selectCity(filteredCities[0]);
            }

            if (event.key === "Escape") {
              clearSearch();
            }
          }}
          placeholder="جستجوی شهر..."
          aria-label="جستجوی شهر"
          className="
            flex-1
            min-w-0
            bg-transparent
            border-none
            outline-none
            ring-0
            focus:border-none
            focus:outline-none
            focus:ring-0
            text-lg
            text-gray-800
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-gray-500
          "
        />

        {/* Clear Button */}

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="پاک کردن جستجو"
            className="
              shrink-0

              w-9
              h-9

              rounded-full

              flex
              items-center
              justify-center

              hover:bg-gray-100
              dark:hover:bg-slate-800

              transition-all
            "
          >
            <Icon
              icon="solar:close-circle-bold-duotone"
              className="
                text-2xl

                text-gray-400
                hover:text-red-500

                transition
              "
            />
          </button>
        )}
      </div>

      {open && search.trim() && (
        <div
          className="
            absolute

            top-[calc(100%+8px)]
            right-0

            w-full

            bg-white
            dark:bg-slate-900

            rounded-3xl

            border
            border-slate-200
            dark:border-slate-700

            shadow-2xl

            max-h-80

            overflow-y-auto

            z-50

            p-2
          "
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const favorite = isFavorite(city);

              return (
                <div
                  key={city.name}
                  className="
                    flex
                    items-center
                    gap-2

                    px-2
                    py-2

                    rounded-2xl

                    hover:bg-yellow-50
                    dark:hover:bg-slate-800

                    transition-all
                    duration-200
                  "
                >
                  {/* City */}

                  <button
                    type="button"
                    onClick={() => selectCity(city)}
                    className="
                      flex-1

                      min-w-0

                      px-3
                      py-3

                      rounded-2xl

                      text-right

                      text-gray-800
                      dark:text-white

                      font-semibold

                      hover:text-yellow-600
                      dark:hover:text-blue-400

                      transition-all
                    "
                  >
                    <span>{city.name}</span>
                  </button>

                  {/* Favorite */}

                  <button
                    type="button"
                    onClick={() => toggleFavorite(city)}
                    aria-label={
                      favorite
                        ? `حذف ${city.name} از شهرهای محبوب`
                        : `افزودن ${city.name} به شهرهای محبوب`
                    }
                    className="
                      shrink-0

                      w-11
                      h-11

                      rounded-xl

                      flex
                      items-center
                      justify-center

                      hover:bg-white
                      dark:hover:bg-slate-700

                      hover:scale-110

                      transition-all
                    "
                  >
                    <Icon
                      icon={
                        favorite
                          ? "solar:star-bold-duotone"
                          : "solar:star-linear"
                      }
                      className={`
                        text-3xl

                        transition-all

                        ${
                          favorite
                            ? "text-yellow-500"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      `}
                    />
                  </button>
                </div>
              );
            })
          ) : (
            <div
              className="
                py-8
                px-4

                text-center
              "
            >
              <Icon
                icon="solar:magnifer-broken"
                className="
                  text-5xl

                  text-gray-300
                  dark:text-slate-600

                  mx-auto
                  mb-3
                "
              />

              <p
                className="
                  text-gray-500
                  dark:text-gray-400

                  font-medium
                "
              >
                شهری پیدا نشد.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchCity;
