import { useState } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "../context/ThemeContext";
import CustomSelect from "../components/CustomSelect";

function Settings() {
  const { darkMode, toggleTheme, setDarkMode } = useTheme();

  const [unit, setUnit] = useState("C");
  const [language, setLanguage] = useState("فارسی");
  const [defaultCity, setDefaultCity] = useState("هرات");

  function resetSettings() {
    setDarkMode(false);

    setUnit("C");
    setLanguage("فارسی");
    setDefaultCity("هرات");
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
      <div className="max-w-5xl mx-auto space-y-8">
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
                icon="solar:settings-bold-duotone"
                className="text-5xl text-yellow-500"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                تنظیمات
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                شخصی‌سازی برنامه هواشناسی
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-6">
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

          <SettingCard
            icon="solar:map-point-bold-duotone"
            title="شهر پیش‌فرض"
            description="شهری که هنگام ورود نمایش داده می‌شود"
          >
            <CustomSelect
              value={defaultCity}
              options={[
                "هرات",
                "کابل",
                "قندهار",
                "مزار شریف",
                "بامیان",
                "بدخشان",
              ]}
              onChange={setDefaultCity}
            />
          </SettingCard>
        </div>

        <button
          onClick={resetSettings}
          className="
          w-full
          bg-red-500
          hover:bg-red-600
          text-white
          font-bold
          rounded-2xl
          py-4
          transition-all
          duration-300
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
      onClick={onClick}
      className={`
      w-16
      h-9
      rounded-full
      transition-all
      duration-300
      relative

      ${active ? "bg-yellow-500" : "bg-gray-300 dark:bg-slate-700"}

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
        transition-all

        ${active ? "right-8" : "right-1"}

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
      dark:border-slate-700
      shadow-sm
      p-6
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-6
      transition-all
      duration-300
      "
    >
      <div className="flex items-center gap-4">
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
            icon={icon}
            className="
            text-4xl
            text-yellow-500
            "
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

export default Settings;
