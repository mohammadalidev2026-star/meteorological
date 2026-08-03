import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

function CustomSelect({ value, options, onChange }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-52">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          h-14
          px-5
          rounded-3xl
          bg-slate-100
          dark:bg-slate-800
          border
          border-slate-200
          dark:border-slate-700
          hover:border-yellow-400
          transition-all
          duration-300
          flex
          items-center
          justify-between
          shadow-sm
          hover:shadow-lg
        "
      >
        <span className="font-semibold text-gray-800 dark:text-white">
          {value}
        </span>

        <Icon
          icon="solar:alt-arrow-down-bold-duotone"
          className={`
            text-2xl
            text-yellow-500
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          absolute
          top-15
          left-0
          w-full
          origin-top
          transition-all
          duration-300
          z-50

          ${
            open
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }
        `}
      >
        <div
          className="
            rounded-3xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white/95
            dark:bg-slate-900/95
            backdrop-blur-xl
            shadow-2xl
            p-2

            max-h-64
            overflow-y-auto

            scrollbar-thin
            scrollbar-thumb-yellow-400
            scrollbar-track-transparent
          "
        >
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className={`
                w-full
                px-4
                py-3
                rounded-2xl
                text-right
                transition-all
                duration-200
                flex
                items-center
                justify-between

                ${
                  value === item
                    ? "bg-yellow-100 dark:bg-yellow-500/15 text-yellow-600"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200"
                }
              `}
            >
              <span>{item}</span>

              {value === item && (
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  className="text-2xl text-yellow-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomSelect;
