import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

/* =========================================
   دریافت اطلاعات آب‌وهوا
========================================= */

export const getWeather = async (latitude, longitude) => {
  if (
    latitude === undefined ||
    latitude === null ||
    longitude === undefined ||
    longitude === null
  ) {
    throw new Error("مختصات شهر مشخص نشده است.");
  }

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        /* مختصات */

        latitude,
        longitude,

        /* =====================================
           اطلاعات فعلی
        ====================================== */

        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "weather_code",
          "wind_speed_10m",
        ].join(","),

        /* =====================================
           پیش‌بینی ساعتی
        ====================================== */

        hourly: ["temperature_2m", "weather_code"].join(","),

        /* =====================================
           پیش‌بینی روزانه 10 روز
        ====================================== */

        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
          "apparent_temperature_max",
          "relative_humidity_2m_max",
          "wind_speed_10m_max",
          "sunrise",
          "sunset",
        ].join(","),

        /* =====================================
           تعداد روزهای پیش‌بینی
        ====================================== */

        forecast_days: 10,

        /* =====================================
           واحد دما
        ====================================== */

        temperature_unit: "celsius",

        /* =====================================
           واحد سرعت باد
        ====================================== */

        wind_speed_unit: "kmh",

        /* =====================================
           منطقه زمانی افغانستان
        ====================================== */

        timezone: "Asia/Kabul",
      },
    });

    return data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات آب‌وهوا:", error);

    throw new Error(
      error.response?.data?.reason ||
        "دریافت اطلاعات آب‌وهوا با مشکل مواجه شد.",
    );
  }
};

export default getWeather;
