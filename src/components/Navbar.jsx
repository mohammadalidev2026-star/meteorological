import { useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { darkMode, toggleTheme } = useTheme();

  const menuItems = [
    {
      name: "خانه",
      path: "/",
    },
    {
      name: "شهرهای محبوب",
      path: "/favorites",
    },
    {
      name: "تنظیمات",
      path: "/settings",
    },
    {
      name: "درباره",
      path: "/about",
    },
  ];

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full

        bg-white/90
        dark:bg-slate-950/90

        backdrop-blur-xl

        border-b
        border-gray-100
        dark:border-slate-800

        transition-colors
        duration-500
      "
    >
      <nav
        className="
          max-w-7xl
          mx-auto
          px-4
          py-3

          flex
          items-center
          justify-between
          gap-4
        "
      >
        <NavLink
          to="/"
          className="
            flex
            items-center
            gap-3
            shrink-0
          "
        >
          <div
            className="
              w-12
              h-12
              md:w-14
              md:h-14

              rounded-2xl

              bg-yellow-100
              dark:bg-blue-500/10

              flex
              items-center
              justify-center

              shadow-sm

              transition-all
              duration-500
            "
          >
            <Icon
              icon="solar:cloud-sun-bold-duotone"
              className="
                text-4xl
                md:text-5xl

                text-yellow-500
                dark:text-blue-400

                transition-colors
                duration-500
              "
            />
          </div>

          <h1
            className="
              text-lg
              md:text-2xl

              font-extrabold

              text-gray-800
              dark:text-white

              transition-colors
              duration-500
            "
          >
            هواشناسی افغانستان
          </h1>
        </NavLink>

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
          "
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  px-5
                  py-2.5

                  rounded-2xl

                  font-semibold

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-yellow-100
                        dark:bg-blue-500/10

                        text-yellow-600
                        dark:text-blue-400

                        shadow-sm
                      `
                      : `
                        text-gray-700
                        dark:text-gray-200

                        hover:bg-gray-100
                        dark:hover:bg-slate-800

                        hover:text-yellow-600
                        dark:hover:text-blue-400
                      `
                  }
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "فعال کردن حالت روشن" : "فعال کردن حالت تاریک"
            }
            title={darkMode ? "حالت روشن" : "حالت تاریک"}
            className="
              w-11
              h-11
              md:w-12
              md:h-12

              rounded-2xl

              bg-yellow-100
              dark:bg-slate-800

              border
              border-yellow-100
              dark:border-slate-700

              flex
              items-center
              justify-center

              transition-all
              duration-300

              hover:scale-105
              hover:shadow-md

              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
              dark:focus:ring-blue-500
            "
          >
            <Icon
              icon={
                darkMode
                  ? "solar:sun-bold-duotone"
                  : "solar:moon-stars-bold-duotone"
              }
              className="
                text-3xl

                text-yellow-500
                dark:text-blue-400

                transition-all
                duration-500
              "
            />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            className="
              lg:hidden

              w-11
              h-11
              md:w-12
              md:h-12

              rounded-2xl

              bg-gray-100
              dark:bg-slate-800

              border
              border-gray-200
              dark:border-slate-700

              flex
              items-center
              justify-center

              transition-all
              duration-300

              hover:scale-105

              focus:outline-none
            "
          >
            <Icon
              icon={
                menuOpen
                  ? "solar:close-circle-bold-duotone"
                  : "solar:hamburger-menu-bold-duotone"
              }
              className="
                text-3xl

                text-yellow-500
                dark:text-blue-400

                transition-colors
                duration-500
              "
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="
            lg:hidden
            px-4
            pb-4
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto

              bg-white
              dark:bg-slate-900

              rounded-3xl

              p-4

              shadow-xl

              border
              border-gray-100
              dark:border-slate-800

              flex
              flex-col
              gap-2

              transition-colors
              duration-500
            "
          >
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `
                    px-5
                    py-3

                    rounded-2xl

                    font-semibold

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-yellow-100
                          dark:bg-blue-500/10

                          text-yellow-600
                          dark:text-blue-400
                        `
                        : `
                          text-gray-700
                          dark:text-gray-200

                          hover:bg-gray-100
                          dark:hover:bg-slate-800

                          hover:text-yellow-600
                          dark:hover:text-blue-400
                        `
                    }
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
