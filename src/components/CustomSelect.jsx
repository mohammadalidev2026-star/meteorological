import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

function CustomSelect({ value, options = [], onChange }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelect(item) {
    onChange(item);
    setOpen(false);
  }

  return (
    <div
      ref={ref}
      className="
        relative
        w-full
        sm:w-52
      "
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`
          w-full
          h-14

          px-5

          rounded-2xl

          bg-slate-100
          dark:bg-slate-800

          border

          ${
            open
              ? `
                border-yellow-400
                dark:border-blue-500
                ring-2
                ring-yellow-100
                dark:ring-blue-500/20
              `
              : `
                border-slate-200
                dark:border-slate-700
              `
          }

          hover:border-yellow-400
          dark:hover:border-blue-500

          flex
          items-center
          justify-between
          gap-3

          shadow-sm
          hover:shadow-md

          transition-all
          duration-300

          focus:outline-none
        `}
      >
        <span
          className="
            font-semibold

            text-gray-800
            dark:text-white

            truncate
          "
        >
          {value}
        </span>

        <Icon
          icon="solar:alt-arrow-down-bold-duotone"
          className={`
            text-2xl

            text-yellow-500
            dark:text-blue-400

            shrink-0

            transition-transform
            duration-300

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          absolute

          top-full
          right-0

          mt-2

          w-full

          z-[100]

          origin-top

          transition-all
          duration-300

          ${
            open
              ? `
                opacity-100
                scale-100
                visible
                translate-y-0
              `
              : `
                opacity-0
                scale-95
                invisible
                -translate-y-2
              `
          }
        `}
      >
        <div
          className="
            rounded-2xl

            border
            border-slate-200
            dark:border-slate-700

            bg-white
            dark:bg-slate-900

            shadow-2xl

            p-2

            max-h-72

            overflow-y-auto

            overscroll-contain

            scrollbar-thin
            scrollbar-thumb-slate-300
            dark:scrollbar-thumb-slate-600
          "
        >
          {options.length > 0 ? (
            options.map((item) => {
              const selected = value === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`
                    w-full

                    px-4
                    py-3

                    rounded-xl

                    text-right

                    flex
                    items-center
                    justify-between
                    gap-3

                    transition-all
                    duration-200

                    ${
                      selected
                        ? `
                          bg-yellow-100
                          dark:bg-blue-500/10

                          text-yellow-600
                          dark:text-blue-400

                          font-semibold
                        `
                        : `
                          text-gray-700
                          dark:text-gray-200

                          hover:bg-slate-100
                          dark:hover:bg-slate-800

                          hover:text-yellow-600
                          dark:hover:text-blue-400
                        `
                    }
                  `}
                >
                  <span className="truncate">{item}</span>

                  {selected && (
                    <Icon
                      icon="solar:check-circle-bold-duotone"
                      className="
                        text-2xl

                        text-yellow-500
                        dark:text-blue-400

                        shrink-0
                      "
                    />
                  )}
                </button>
              );
            })
          ) : (
            <p
              className="
                px-4
                py-3

                text-center

                text-sm

                text-gray-500
                dark:text-gray-400
              "
            >
              گزینه‌ای موجود نیست
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomSelect;
