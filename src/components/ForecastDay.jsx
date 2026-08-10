import { Icon } from "@iconify/react";

function ForecastDay({ day, icon, min, max, open }) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      p-5
      rounded-3xl
      cursor-pointer
      transition-all
      duration-300
      hover:bg-yellow-50
      dark:hover:bg-slate-800
      "
    >
      {/* بخش روز و آیکن */}
      <div className="flex items-center gap-4">
        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-yellow-100
          dark:bg-slate-800
          flex
          items-center
          justify-center
          transition-all
          duration-300
          "
        >
          <Icon
            icon={icon}
            className="
            text-3xl
            text-yellow-500
            "
          />
        </div>

        <div className="text-right">
          <p
            className="
            font-bold
            text-gray-800
            dark:text-white
            "
          >
            {day}
          </p>
        </div>
      </div>

      {/* دما و فلش */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p
            className="
            text-xs
            text-gray-400
            dark:text-gray-500
            "
          >
            کمترین
          </p>

          <p className="font-bold text-yellow-600">{min}</p>
        </div>

        <div className="text-center">
          <p
            className="
            text-xs
            text-gray-400
            dark:text-gray-500
            "
          >
            بیشترین
          </p>

          <p className="font-bold text-orange-500">{max}</p>
        </div>

        <Icon
          icon="solar:alt-arrow-down-bold"
          className={`
            text-3xl
            text-yellow-500
            transition-all
            duration-300
            ease-in-out
            ${open ? "rotate-180" : "rotate-0"}
          `}
        />
      </div>
    </div>
  );
}

export default ForecastDay;
