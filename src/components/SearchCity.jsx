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
    if (!search.trim()) return [];

    return afghanistanCities.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase()),
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
    onSelect?.(city);

    setSearch("");

    setOpen(false);
  }

  function toggleFavorite(city) {
    let updatedFavorites;

    const exists = favorites.some((item) => item.city === city);

    if (exists) {
      updatedFavorites = favorites.filter((item) => item.city !== city);
    } else {
      updatedFavorites = [
        ...favorites,
        {
          city,
          temperature: "--°",
          condition: "در حال دریافت اطلاعات",
        },
      ];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function isFavorite(city) {
    return favorites.some((item) => item.city === city);
  }

  return (
    <div
      ref={wrapperRef}
      className="
      relative
      w-full
      max-w-xl
      mx-auto
      "
      dir="rtl"
    >
      <div
        className="
        flex
        items-center
        gap-3
        h-16
        px-5
        rounded-3xl
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-700
        shadow-sm
        transition-all
        duration-300
        focus-within:ring-2
        focus-within:ring-yellow-400/40
        "
      >
        <Icon
          icon="solar:magnifer-bold-duotone"
          className="
          text-3xl
          text-yellow-500
          "
        />

        <input
          value={search}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);

            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filteredCities.length > 0) {
              selectCity(filteredCities[0]);
            }
          }}
          placeholder="جستجوی شهر..."
          className="
          flex-1
          bg-transparent
          outline-none
          text-lg
          text-gray-800
          dark:text-white
          placeholder:text-gray-400
          "
        />

        {search && (
          <button
            onClick={() => {
              setSearch("");

              setOpen(false);
            }}
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

      {open && search && (
        <div
          className="
          absolute
          top-18
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
          "
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city}
                className="
                flex
                items-center
                justify-between
                px-5
                py-4
                hover:bg-yellow-50
                dark:hover:bg-slate-800
                transition-all
                "
              >
                <button
                  onClick={() => selectCity(city)}
                  className="
                  flex-1
                  text-right
                  text-gray-800
                  dark:text-white
                  "
                >
                  {city}
                </button>

                <button
                  onClick={() => toggleFavorite(city)}
                  className="
                  mr-4
                  hover:scale-110
                  transition-all
                  "
                >
                  <Icon
                    icon={
                      isFavorite(city)
                        ? "solar:star-bold-duotone"
                        : "solar:star-linear"
                    }
                    className={`
                    text-3xl
                    ${isFavorite(city) ? "text-yellow-500" : "text-gray-400"}
                    `}
                  />
                </button>
              </div>
            ))
          ) : (
            <div
              className="
              py-5
              text-center
              text-gray-500
              dark:text-gray-400
              "
            >
              شهری پیدا نشد.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchCity;
