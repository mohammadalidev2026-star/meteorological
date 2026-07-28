import { Icon } from "@iconify/react";

function HeroWeather() {
  return (
    <section
      className="
      rounded-4xl
      bg-linear-to-br     
      from-sky-400
      via-sky-500
      to-cyan-500
      text-white
      p-8
      md:p-12
      shadow-xl
      "
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <Icon
              icon="solar:location-bold-duotone"
              className="text-3xl text-yellow-300"
            />

            <span className="text-lg">هرات، افغانستان</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black">28°</h1>

          <p className="text-2xl mt-3">آفتابی</p>
        </div>

        <Icon
          icon="solar:sun-2-bold-duotone"
          className="text-[130px] md:text-[170px] text-yellow-300"
        />
      </div>
    </section>
  );
}

export default HeroWeather;
