import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "../context/ThemeContext";
import CustomSelect from "../components/CustomSelect";
import afghanistanCities from "../data/afghanistanCities";

function Settings() {
  const { darkMode, toggleTheme, setDarkMode } = useTheme();

  const [unit, setUnit] = useState(localStorage.getItem("unit") || "°C");

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "فارسی",
  );

  const [defaultCity, setDefaultCity] = useState(
    localStorage.getItem("selectedCity") || "هرات",
  );

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("selectedCity", defaultCity);

    window.dispatchEvent(new Event("cityChanged"));
  }, [defaultCity]);

  function resetSettings() {
    setDarkMode(false);

    setUnit("°C");
    setLanguage("فارسی");
    setDefaultCity("هرات");

    localStorage.setItem("unit", "°C");
    localStorage.setItem("language", "فارسی");
    localStorage.setItem("selectedCity", "هرات");

    localStorage.setItem("theme", "light");

    document.documentElement.classList.remove("dark");

    window.dispatchEvent(new Event("cityChanged"));
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
        duration-500
      "
    >
      <div
        className="
          max-w-4xl
          mx-auto
        "
      >
        <section
          className="
            bg-white
            dark:bg-slate-900

            rounded-3xl

            border
            border-gray-100
            dark:border-slate-800

            shadow-sm

            p-6
            md:p-8

            mb-6

            transition-colors
            duration-500
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-yellow-100
                dark:bg-blue-500/10

                flex
                items-center
                justify-center

                shrink-0
              "
            >
              <Icon
                icon="solar:settings-bold-duotone"
                className="
                  text-4xl

                  text-yellow-500
                  dark:text-blue-400

                  transition-colors
                  duration-500
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
                تنظیمات
              </h1>

              <p
                className="
                  text-gray-500
                  dark:text-gray-400

                  mt-2
                "
              >
                شخصی‌سازی برنامه هواشناسی
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          {/* حالت تاریک */}

          <SettingCard
            icon={
              darkMode
                ? "solar:sun-bold-duotone"
                : "solar:moon-stars-bold-duotone"
            }
            title={darkMode ? "حالت روشن" : "حالت تاریک"}
            description={
              darkMode ? "بازگشت به حالت روشن" : "فعال کردن حالت تاریک برنامه"
            }
          >
            <ToggleButton active={darkMode} onClick={toggleTheme} />
          </SettingCard>

          {/* واحد دما */}

          <SettingCard
            icon="solar:temperature-bold-duotone"
            title="واحد دما"
            description="انتخاب واحد نمایش دما"
          >
            <CustomSelect
              value={unit}
              options={["°C", "°F"]}
              onChange={setUnit}
            />
          </SettingCard>

          {/* زبان */}

          <SettingCard
            icon="solar:translation-bold-duotone"
            title="زبان"
            description="انتخاب زبان برنامه"
          >
            <CustomSelect
              value={language}
              options={["فارسی", "English"]}
              onChange={setLanguage}
            />
          </SettingCard>

          {/* شهر پیش‌فرض */}

          <SettingCard
            icon="solar:map-point-bold-duotone"
            title="شهر پیش‌فرض"
            description="شهری که هنگام ورود نمایش داده می‌شود"
          >
            <CustomSelect
              value={defaultCity}
              options={afghanistanCities.map((city) => city.name)}
              onChange={setDefaultCity}
            />
          </SettingCard>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="
            w-full

            mt-6

            bg-red-500
            hover:bg-red-600

            dark:bg-red-600
            dark:hover:bg-red-700

            text-white
            font-bold

            rounded-2xl

            py-4

            shadow-sm
            hover:shadow-lg

            transition-all
            duration-300

            hover:-translate-y-0.5
          "
        >
          بازنشانی تنظیمات
        </button>
      </div>
    </main>
  );
}

function ToggleButton({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "غیرفعال کردن حالت تاریک" : "فعال کردن حالت تاریک"}
      className={`
        w-16
        h-9

        rounded-full

        transition-all
        duration-300

        relative

        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        dark:focus:ring-offset-slate-900

        ${
          active
            ? `
              bg-blue-500
              dark:bg-blue-500
              focus:ring-blue-400
            `
            : `
              bg-gray-300
              dark:bg-slate-700
              focus:ring-yellow-400
            `
        }
      `}
    >
      <span
        className={`
          absolute
          top-1

          w-7
          h-7

          rounded-full

          bg-white

          shadow-sm

          transition-all
          duration-300

          ${active ? "right-1" : "right-8"}
        `}
      />
    </button>
  );
}

function SettingCard({ icon, title, description, children }) {
  return (
    <div
      className="
        bg-white
        dark:bg-slate-900

        rounded-3xl

        border
        border-gray-100
        dark:border-slate-800

        shadow-sm

        p-5
        md:p-6

        flex
        flex-col
        sm:flex-row

        sm:items-center
        sm:justify-between

        gap-5

        transition-all
        duration-500

        hover:shadow-md
      "
    >
      <div
        className="
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
            dark:bg-blue-500/10

            flex
            items-center
            justify-center

            shrink-0
          "
        >
          <Icon
            icon={icon}
            className="
              text-3xl

              text-yellow-500
              dark:text-blue-400

              transition-colors
              duration-500
            "
          />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-bold

              text-gray-800
              dark:text-white
            "
          >
            {title}
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400

              mt-1

              text-sm
              md:text-base
            "
          >
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default Settings;
