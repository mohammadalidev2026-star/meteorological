// src/components/Navbar.jsx

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

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
      backdrop-blur-xl
      bg-white/80
      dark:bg-slate-950/80
      border-b
      border-gray-200
      dark:border-slate-800
      "
    >
      <nav
        className="
        max-w-7xl
        mx-auto
        px-5
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div
            className="
            w-14
            h-14
            rounded-3xl
            bg-yellow-100
            dark:bg-yellow-500/10
            flex
            items-center
            justify-center
            "
          >
            <Icon
              icon="solar:cloud-sun-bold-duotone"
              className="
              text-5xl
              text-yellow-500
              "
            />
          </div>

          <div>
            <h1
              className="
              text-xl
              md:text-2xl
              font-extrabold
              text-gray-800
              dark:text-white
              "
            >
              هواشناسی افغانستان
            </h1>
          </div>
        </div>

        {/* Desktop Menu */}

        <div
          className="
          hidden
          lg:flex
          items-center
          gap-3
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
                    ? "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-500 shadow-sm"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-yellow-500"
                }
                `
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Buttons */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          {/* Dark Mode */}

          <button
            onClick={toggleTheme}
            className="
            w-12
            h-12
            rounded-2xl
            bg-yellow-100
            dark:bg-slate-800
            flex
            items-center
            justify-center
            hover:scale-110
            transition
            "
          >
            <Icon
              icon={
                darkMode ? "solar:sun-bold-duotone" : "solar:moon-bold-duotone"
              }
              className="
              text-3xl
              text-yellow-500
              "
            />
          </button>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
            lg:hidden
            w-12
            h-12
            rounded-2xl
            bg-gray-100
            dark:bg-slate-800
            flex
            items-center
            justify-center
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
              "
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}

      {menuOpen && (
        <div
          className="
          lg:hidden
          px-5
          pb-5
          "
        >
          <div
            className="
            bg-white
            dark:bg-slate-900
            rounded-3xl
            p-5
            shadow-lg
            border
            border-gray-100
            dark:border-slate-800
            flex
            flex-col
            gap-2
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
                  transition

                  ${
                    isActive
                      ? "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-500"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
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
