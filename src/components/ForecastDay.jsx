import { Icon } from "@iconify/react";

function ForecastDay({ day, icon, min, max, open }) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      p-5
      cursor-pointer
      hover:bg-yellow-50
      transition-all
      duration-300
      "
    >
      {/* بخش روز و آیکن */}
      <div className="flex items-center gap-4">
        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-yellow-100
          flex
          items-center
          justify-center
          "
        >
          <Icon icon={icon} className="text-3xl text-yellow-500" />
        </div>

        <div className="text-right">
          <p className="font-bold text-gray-800">{day}</p>
        </div>
      </div>
      {/* دما و فلش */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-gray-400">کمترین</p>

          <p className="font-bold text-yellow-600">{min}</p>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">بیشترین</p>

          <p className="font-bold text-orange-500">{max}</p>
        </div>

        <Icon
          icon="solar:alt-arrow-down-bold"
          className={`
            text-3xl
            text-yellow-500
            transition-transform
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
