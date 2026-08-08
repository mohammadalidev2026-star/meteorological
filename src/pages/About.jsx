import { Icon } from "@iconify/react";

const features = [
  {
    icon: "solar:cloud-sun-bold-duotone",
    title: "پیش‌بینی دقیق آب‌وهوا",
    description:
      "نمایش وضعیت فعلی، پیش‌بینی ساعتی و پیش‌بینی ۱۰ روز آینده برای شهرهای افغانستان.",
  },
  {
    icon: "solar:moon-stars-bold-duotone",
    title: "حالت روشن و تاریک",
    description:
      "پشتیبانی کامل از حالت روشن و تاریک با طراحی مدرن و هماهنگ در تمام بخش‌های برنامه.",
  },
  {
    icon: "solar:map-point-bold-duotone",
    title: "تمام شهرهای افغانستان",
    description:
      "مشاهده وضعیت آب‌وهوا برای شهرها و ولایت‌های مختلف افغانستان با استفاده از مختصات جغرافیایی.",
  },
  {
    icon: "solar:smartphone-bold-duotone",
    title: "طراحی واکنش‌گرا",
    description:
      "سازگار با موبایل، تبلت و کامپیوتر تا تجربه کاربری در تمام اندازه‌های صفحه یکسان باشد.",
  },
];

function About() {
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
      <div
        className="
        max-w-6xl
        mx-auto
        space-y-6
        "
      >
        {/* Header */}

        <section
          className="
          relative
          overflow-hidden
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-800
          shadow-sm
          p-6
          md:p-8
          transition-all
          duration-300
          "
        >
          <div
            className="
            absolute
            -top-20
            -left-20
            w-48
            h-48
            rounded-full
            bg-blue-500/5
            dark:bg-blue-400/5
            blur-3xl
            "
          />

          <div
            className="
            relative
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            gap-5
            "
          >
            <div
              className="
              w-16
              h-16
              shrink-0
              rounded-3xl
              bg-blue-50
              dark:bg-blue-500/10
              border
              border-blue-100
              dark:border-blue-500/20
              flex
              items-center
              justify-center
              "
            >
              <Icon
                icon="solar:info-circle-bold-duotone"
                className="
                text-5xl
                text-blue-500
                dark:text-blue-400
                "
              />
            </div>

            <div>
              <h1
                className="
                text-3xl
                md:text-4xl
                font-extrabold
                text-slate-800
                dark:text-white
                "
              >
                درباره پروژه
              </h1>

              <p
                className="
                text-slate-500
                dark:text-slate-400
                mt-2
                leading-7
                "
              >
                سامانه هواشناسی افغانستان با رابط کاربری فارسی و طراحی مدرن
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}

        <section
          className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-800
          shadow-sm
          p-6
          md:p-8
          transition-all
          duration-300
          "
        >
          <div
            className="
            flex
            items-center
            gap-3
            mb-5
            "
          >
            <div
              className="
              w-11
              h-11
              rounded-2xl
              bg-blue-50
              dark:bg-blue-500/10
              flex
              items-center
              justify-center
              "
            >
              <Icon
                icon="solar:document-text-bold-duotone"
                className="
                text-2xl
                text-blue-500
                dark:text-blue-400
                "
              />
            </div>

            <h2
              className="
              text-2xl
              font-bold
              text-slate-800
              dark:text-white
              "
            >
              معرفی پروژه
            </h2>
          </div>

          <p
            className="
            leading-9
            text-slate-600
            dark:text-slate-300
            "
          >
            این پروژه برای نمایش وضعیت آب‌وهوا، پیش‌بینی ساعتی و پیش‌بینی ۱۰ روز
            آینده شهرهای افغانستان ساخته شده است. اطلاعات آب‌وهوا از طریق API
            دریافت می‌شود و رابط کاربری با تمرکز بر سادگی، سرعت و تجربه کاربری
            مناسب طراحی شده است.
          </p>
        </section>

        {/* Features */}

        <section>
          <div className="mb-6">
            <h2
              className="
              text-2xl
              font-bold
              text-slate-800
              dark:text-white
              "
            >
              امکانات پروژه
            </h2>

            <p
              className="
              mt-2
              text-slate-500
              dark:text-slate-400
              "
            >
              امکانات اصلی سامانه هواشناسی
            </p>
          </div>

          <div
            className="
            grid
            sm:grid-cols-2
            gap-5
            "
          >
            {features.map((item) => (
              <div
                key={item.title}
                className="
                group
                bg-white
                dark:bg-slate-900
                rounded-3xl
                border
                border-slate-200
                dark:border-slate-800
                shadow-sm
                p-6
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-blue-200
                dark:hover:border-blue-500/30
                transition-all
                duration-300
                "
              >
                <div
                  className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-blue-50
                  dark:bg-blue-500/10
                  border
                  border-blue-100
                  dark:border-blue-500/20
                  flex
                  items-center
                  justify-center
                  mb-5
                  group-hover:scale-105
                  transition-transform
                  duration-300
                  "
                >
                  <Icon
                    icon={item.icon}
                    className="
                    text-4xl
                    text-blue-500
                    dark:text-blue-400
                    "
                  />
                </div>

                <h3
                  className="
                  text-xl
                  font-bold
                  text-slate-800
                  dark:text-white
                  mb-3
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                  leading-8
                  text-slate-500
                  dark:text-slate-400
                  "
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Project Information */}

        <section
          className="
          grid
          md:grid-cols-2
          gap-5
          "
        >
          {/* Technologies */}

          <InfoCard
            icon="solar:code-bold-duotone"
            title="تکنولوژی‌های استفاده‌شده"
          >
            <div className="grid grid-cols-2 gap-3">
              <TechItem
                icon="solar:code-square-bold-duotone"
                title="React 19"
              />

              <TechItem
                icon="solar:palette-bold-duotone"
                title="Tailwind CSS 4"
              />

              <TechItem icon="solar:rocket-bold-duotone" title="Vite" />

              <TechItem
                icon="solar:routing-bold-duotone"
                title="React Router"
              />

              <TechItem
                icon="solar:slider-horizontal-bold-duotone"
                title="Embla Carousel"
              />

              <TechItem icon="solar:widget-5-bold-duotone" title="Iconify" />
            </div>
          </InfoCard>

          {/* Project Info */}

          <InfoCard
            icon="solar:clipboard-text-bold-duotone"
            title="اطلاعات پروژه"
          >
            <div className="space-y-4">
              <InfoRow title="نسخه" value="1.0.0" />

              <InfoRow title="طراحی" value="Modern UI" />

              <InfoRow title="زبان" value="فارسی" />

              <InfoRow title="کشور" value="افغانستان" />

              <InfoRow title="منبع اطلاعات" value="Weather API" />
            </div>
          </InfoCard>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      rounded-3xl
      border
      border-slate-200
      dark:border-slate-800
      shadow-sm
      p-6
      md:p-7
      transition-all
      duration-300
      "
    >
      <div
        className="
        flex
        items-center
        gap-4
        mb-6
        "
      >
        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-blue-50
          dark:bg-blue-500/10
          flex
          items-center
          justify-center
          "
        >
          <Icon
            icon={icon}
            className="
            text-3xl
            text-blue-500
            dark:text-blue-400
            "
          />
        </div>

        <h3
          className="
          text-xl
          font-bold
          text-slate-800
          dark:text-white
          "
        >
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
}

function TechItem({ icon, title }) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      p-3
      rounded-2xl
      bg-slate-50
      dark:bg-slate-800
      border
      border-slate-100
      dark:border-slate-700
      "
    >
      <Icon
        icon={icon}
        className="
        text-2xl
        text-blue-500
        dark:text-blue-400
        shrink-0
        "
      />

      <span
        className="
        text-sm
        font-semibold
        text-slate-700
        dark:text-slate-200
        "
      >
        {title}
      </span>
    </div>
  );
}

function InfoRow({ title, value }) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      gap-4
      pb-3
      border-b
      border-slate-100
      dark:border-slate-800
      last:border-0
      last:pb-0
      "
    >
      <span
        className="
        text-slate-500
        dark:text-slate-400
        "
      >
        {title}
      </span>

      <span
        className="
        font-bold
        text-slate-800
        dark:text-white
        text-left
        "
      >
        {value}
      </span>
    </div>
  );
}

export default About;
