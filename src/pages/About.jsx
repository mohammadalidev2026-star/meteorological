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
    title: "دارک مود",
    description:
      "پشتیبانی کامل از حالت روشن و تاریک با طراحی مدرن و چشم‌نواز.",
  },
  {
    icon: "solar:map-point-bold-duotone",
    title: "شهرهای افغانستان",
    description:
      "امکان مشاهده وضعیت آب‌وهوا برای شهرهای مختلف افغانستان.",
  },
  {
    icon: "solar:smartphone-bold-duotone",
    title: "طراحی واکنش‌گرا",
    description:
      "سازگار با موبایل، تبلت و دسکتاپ بدون افت کیفیت.",
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
      <div className="max-w-6xl mx-auto space-y-8">

        {/* عنوان */}

        <section
          className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-gray-100
          dark:border-slate-700
          shadow-sm
          p-8
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
              w-16
              h-16
              rounded-3xl
              bg-yellow-100
              dark:bg-yellow-500/10
              flex
              items-center
              justify-center
              "
            >
              <Icon
                icon="solar:info-circle-bold-duotone"
                className="text-5xl text-yellow-500"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                درباره پروژه
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                سامانه هواشناسی افغانستان با طراحی مدرن و رابط کاربری فارسی
              </p>

            </div>

          </div>
        </section>

        {/* معرفی */}

        <section
          className="
          bg-white
          dark:bg-slate-900
          rounded-3xl
          border
          border-gray-100
          dark:border-slate-700
          shadow-sm
          p-8
          "
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
            معرفی پروژه
          </h2>

          <p className="leading-9 text-gray-600 dark:text-gray-300">
            این پروژه با هدف نمایش وضعیت آب‌وهوا و پیش‌بینی روزهای آینده برای
            شهرهای افغانستان طراحی شده است. رابط کاربری کاملاً فارسی بوده و
            با استفاده از React، Tailwind CSS و Vite توسعه یافته است.
          </p>
        </section>

        {/* امکانات */}

        <section>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            امکانات پروژه
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {features.map((item) => (

              <div
                key={item.title}
                className="
                bg-white
                dark:bg-slate-900
                rounded-3xl
                border
                border-gray-100
                dark:border-slate-700
                shadow-sm
                p-6
                hover:-translate-y-1
                hover:shadow-xl
                transition-all
                duration-300
                "
              >

                <div
                  className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-yellow-100
                  dark:bg-yellow-500/10
                  flex
                  items-center
                  justify-center
                  mb-5
                  "
                >
                  <Icon
                    icon={item.icon}
                    className="text-4xl text-yellow-500"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="leading-8 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* اطلاعات پروژه */}

        <section className="grid md:grid-cols-2 gap-6">

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
            "
          >
            <div className="flex items-center gap-3 mb-5">
              <Icon
                icon="solar:code-bold-duotone"
                className="text-4xl text-yellow-500"
              />
              <h3 className="text-xl font-bold dark:text-white">
                تکنولوژی‌ها
              </h3>
            </div>

            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>React 19</li>
              <li>Tailwind CSS 4</li>
              <li>Vite</li>
              <li>React Router</li>
              <li>Embla Carousel</li>
              <li>Iconify</li>
            </ul>
          </div>

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
            "
          >
            <div className="flex items-center gap-3 mb-5">
              <Icon
                icon="solar:user-bold-duotone"
                className="text-4xl text-yellow-500"
              />
              <h3 className="text-xl font-bold dark:text-white">
                اطلاعات پروژه
              </h3>
            </div>

            <div className="space-y-4">

              <InfoRow title="نسخه" value="1.0.0" />

              <InfoRow title="طراحی" value="Modern UI" />

              <InfoRow title="زبان" value="فارسی" />

              <InfoRow title="کشور" value="افغانستان" />

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

function InfoRow({ title, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 dark:text-gray-400">
        {title}
      </span>

      <span className="font-bold text-gray-800 dark:text-white">
        {value}
      </span>
    </div>
  );
}

export default About;