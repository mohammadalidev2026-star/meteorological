import { Icon } from "@iconify/react";

function TodaySummary() {
  return (
    <section className="mt-8">
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
        transition-all
        duration-300
        "
      >
        {/* عنوان */}

        <div className="flex items-center gap-3 mb-6">
          <div
            className="
            w-12
            h-12
            rounded-2xl
            bg-yellow-100
            dark:bg-yellow-500/10
            flex
            items-center
            justify-center
            "
          >
            <Icon
              icon="solar:calendar-bold-duotone"
              className="text-3xl text-yellow-500"
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
              وضعیت امروز
            </h2>

            <p
              className="
              text-sm
              text-gray-500
              dark:text-gray-400
              "
            >
              خلاصه وضعیت آب‌وهوای امروز
            </p>
          </div>
        </div>

        {/* کارت‌ها */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <Card
            icon="solar:temperature-bold-duotone"
            title="کمترین دما"
            value="10°"
          />

          <Card icon="solar:sun-bold-duotone" title="بیشترین دما" value="40°" />

          <Card
            icon="solar:sunrise-bold-duotone"
            title="طلوع آفتاب"
            value="05:45"
          />

          <Card
            icon="solar:sunset-bold-duotone"
            title="غروب آفتاب"
            value="19:12"
          />
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, value }) {
  return (
    <div
      className="
      rounded-2xl
      bg-gray-50
      dark:bg-slate-800
      border
      border-transparent
      dark:border-slate-700
      p-5
      hover:-translate-y-1
      hover:shadow-lg
      transition-all
      duration-300
      "
    >
      <div
        className="
        w-12
        h-12
        rounded-2xl
        bg-yellow-100
        dark:bg-yellow-500/10
        flex
        items-center
        justify-center
        mb-4
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

      <p
        className="
        text-sm
        text-gray-500
        dark:text-gray-400
        "
      >
        {title}
      </p>

      <h3
        className="
        mt-2
        text-2xl
        font-bold
        text-gray-800
        dark:text-white
        "
      >
        {value}
      </h3>
    </div>
  );
}

export default TodaySummary;
