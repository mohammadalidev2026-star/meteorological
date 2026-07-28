import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "خانه",
      path: "/",
      icon: "solar:home-smile-bold",
    },
    {
      title: "علاقه‌مندی",
      path: "/favorites",
      icon: "solar:heart-bold",
    },
    {
      title: "تنظیمات",
      path: "/settings",
      icon: "solar:settings-bold",
    },
    {
      title: "درباره",
      path: "/about",
      icon: "solar:info-circle-bold",
    },
  ];

  return (
    <header className="w-full">
      <nav
        className="
        w-full
        bg-white/85
        backdrop-blur-xl
        border-b
        border-gray-100
        shadow-sm
        px-5 
        md:px-14
        py-4
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
        "
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-yellow-100
                flex
                items-center
                justify-center
                "
            >
              <Icon
                icon="solar:sun-2-bold-duotone"
                className="
                  text-3xl
                  text-yellow-500
                  "
              />
            </div>

            <div>
              <h1
                className="
                text-lg
                md:text-xl
                font-bold
                text-gray-800
              "
              >
                هواشناسی افغانستان
              </h1>

              <p
                className="
                text-xs
                text-gray-500
              "
              >
                پیش‌بینی هوای شهرهای افغانستان
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div
            className="
            hidden
            md:flex
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
                  flex items-center gap-2
                  px-4 py-2
                  rounded-xl
                  text-sm
                  transition-all duration-300

                  ${
                    isActive
                      ? "bg-sky-500 text-white"
                      : "text-gray-600 hover:bg-sky-50 hover:text-sky-500"
                  }
                  `
                }
              >
                <Icon icon={item.icon} className="text-lg" />

                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
            md:hidden
            w-11 h-11
            rounded-xl
            bg-blue-50
            text-blue-600
            flex
            items-center
            justify-center
            "
          >
            <Icon
              icon={
                menuOpen
                  ? "solar:close-circle-bold"
                  : "solar:hamburger-menu-bold"
              }
              className="text-2xl"
            />
          </button>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div
            className="
            md:hidden
            mt-4
            border-t
            border-gray-100
            pt-4
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
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  
                  ${isActive ? "bg-sky-500 text-white" : "text-gray-600 "}
                  `
                }
              >
                <Icon icon={item.icon} />

                {item.title}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
