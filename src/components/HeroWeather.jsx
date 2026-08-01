import { Icon } from "@iconify/react";

function HeroWeather() {
  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-4xl
      bg-gradient-to-br
      from-sky-400
      via-sky-500
      to-cyan-500
      dark:from-slate-900
      dark:via-slate-800
      dark:to-slate-900
      text-white
      p-8
      md:p-12
      shadow-2xl
      border
      border-white/10
      dark:border-slate-700
      transition-all
      duration-300
      "
    >
      {/* Background Glow */}
      <div
        className="
        absolute
        -top-20
        -left-20
        w-72
        h-72
        rounded-full
        bg-white/10
        blur-3xl
        "
      />

      <div
        className="
        absolute
        -bottom-24
        -right-24
        w-80
        h-80
        rounded-full
        bg-cyan-300/20
        blur-3xl
        "
      />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left */}
        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <Icon
              icon="solar:location-bold-duotone"
              className="text-3xl text-yellow-300"
            />

            <span className="text-lg font-medium text-white/95">
              هرات، افغانستان
            </span>
          </div>

          <h1
            className="
            text-7xl
            md:text-8xl
            font-black
            leading-none
            tracking-tight
            drop-shadow-lg
            "
          >
            28°
          </h1>

          <p className="mt-4 text-2xl md:text-3xl font-semibold text-white/95">
            آفتابی
          </p>
        </div>

        {/* Right */}
        <div className="relative">
          <div
            className="
            absolute
            inset-0
            rounded-full
            bg-yellow-300/20
            blur-3xl
            scale-125
            "
          />

          <Icon
            icon="solar:sun-2-bold-duotone"
            className="
            relative
            text-[150px]
            md:text-[200px]
            text-yellow-300
            drop-shadow-[0_0_30px_rgba(253,224,71,0.45)]
            "
          />
        </div>
      </div>
    </section>
  );
}

export default HeroWeather;
