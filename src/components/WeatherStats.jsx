import { Icon } from "@iconify/react";

const stats = [
  {
    title: "رطوبت",
    value: "12%",
    icon: "solar:waterdrops-bold-duotone",
  },
  {
    title: "سرعت باد",
    value: "12 کیلومتر بر ساعت",
    icon: "solar:wind-bold-duotone",
  },
  {
    title: "احساس دما",
    value: "26°",
    icon: "solar:temperature-bold-duotone",
  },
];

function WeatherStats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-gray-100
          p-6
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-yellow-100
              flex
              items-center
              justify-center
              "
            >
              <Icon icon={item.icon} className="text-4xl text-yellow-500" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>

              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {item.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default WeatherStats;
