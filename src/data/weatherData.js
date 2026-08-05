const weatherData = [
  {
    city: "هرات",

    temperature: "34°",
    condition: "آفتابی",
    icon: "solar:sun-bold-duotone",

    humidity: "12%",
    wind: "12 km/h",
    feels: "33°",

    sunrise: "05:30",
    sunset: "19:45",

    hourly: [
      { time: "00:00", temp: "22°", icon: "solar:moon-bold-duotone" },
      { time: "01:00", temp: "21°", icon: "solar:cloud-bold-duotone" },
      { time: "02:00", temp: "21°", icon: "solar:cloud-bold-duotone" },
      { time: "03:00", temp: "20°", icon: "solar:cloud-bold-duotone" },
      { time: "04:00", temp: "20°", icon: "solar:cloud-sun-bold-duotone" },
      { time: "05:00", temp: "21°", icon: "solar:sun-bold-duotone" },
      { time: "06:00", temp: "24°", icon: "solar:sun-bold-duotone" },
      { time: "07:00", temp: "27°", icon: "solar:sun-bold-duotone" },
      { time: "08:00", temp: "29°", icon: "solar:sun-bold-duotone" },
      { time: "09:00", temp: "31°", icon: "solar:sun-bold-duotone" },
      { time: "10:00", temp: "33°", icon: "solar:sun-bold-duotone" },
      { time: "11:00", temp: "34°", icon: "solar:sun-bold-duotone" },
      { time: "12:00", temp: "35°", icon: "solar:sun-bold-duotone" },
      { time: "13:00", temp: "36°", icon: "solar:sun-bold-duotone" },
      { time: "14:00", temp: "36°", icon: "solar:sun-bold-duotone" },
      { time: "15:00", temp: "35°", icon: "solar:cloud-sun-bold-duotone" },
      { time: "16:00", temp: "33°", icon: "solar:cloud-sun-bold-duotone" },
      { time: "17:00", temp: "31°", icon: "solar:cloud-bold-duotone" },
      { time: "18:00", temp: "29°", icon: "solar:moon-bold-duotone" },
      { time: "19:00", temp: "27°", icon: "solar:moon-bold-duotone" },
      { time: "20:00", temp: "25°", icon: "solar:moon-bold-duotone" },
      { time: "21:00", temp: "24°", icon: "solar:cloud-bold-duotone" },
      { time: "22:00", temp: "23°", icon: "solar:cloud-bold-duotone" },
      { time: "23:00", temp: "22°", icon: "solar:moon-bold-duotone" },
    ],

    forecast10Days: [
      {
        day: "یکشنبه",
        icon: "solar:sun-bold-duotone",
        min: "10°",
        max: "40°",
        sunrise: "05:30",
        sunset: "19:45",
        humidity: "12%",
        wind: "12 km/h",
        feels: "26°",
        description: "آسمان صاف و آفتابی",

        hourly: [
          { time: "00:00", temp: "22°", icon: "solar:moon-bold-duotone" },
          { time: "06:00", temp: "24°", icon: "solar:sun-bold-duotone" },
          { time: "12:00", temp: "35°", icon: "solar:sun-bold-duotone" },
          { time: "18:00", temp: "29°", icon: "solar:cloud-bold-duotone" },
        ],
      },

      {
        day: "دوشنبه",
        icon: "solar:cloud-sun-bold-duotone",
        min: "12°",
        max: "37°",
        sunrise: "05:31",
        sunset: "19:44",
        humidity: "18%",
        wind: "15 km/h",
        feels: "28°",
        description: "کمی ابری همراه با آفتاب",

        hourly: [
          { time: "00:00", temp: "21°", icon: "solar:cloud-bold-duotone" },
          { time: "06:00", temp: "23°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "12:00", temp: "33°", icon: "solar:sun-bold-duotone" },
          { time: "18:00", temp: "28°", icon: "solar:cloud-bold-duotone" },
        ],
      },

      {
        day: "سه‌شنبه",
        icon: "solar:cloud-bold-duotone",
        min: "14°",
        max: "35°",
        sunrise: "05:32",
        sunset: "19:43",
        humidity: "22%",
        wind: "10 km/h",
        feels: "27°",
        description: "هوای نیمه ابری",

        hourly: [
          { time: "00:00", temp: "20°", icon: "solar:cloud-bold-duotone" },
          { time: "06:00", temp: "22°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "12:00", temp: "31°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "18:00", temp: "26°", icon: "solar:cloud-bold-duotone" },
        ],
      },
      {
        city: "کابل",

        temperature: "27°",
        condition: "کمی ابری",
        icon: "solar:cloud-sun-bold-duotone",

        humidity: "20%",
        wind: "10 km/h",
        feels: "26°",

        sunrise: "05:20",
        sunset: "19:30",

        hourly: [
          { time: "00:00", temp: "16°", icon: "solar:cloud-bold-duotone" },
          { time: "01:00", temp: "15°", icon: "solar:cloud-bold-duotone" },
          { time: "02:00", temp: "15°", icon: "solar:cloud-bold-duotone" },
          { time: "03:00", temp: "14°", icon: "solar:cloud-bold-duotone" },
          { time: "04:00", temp: "14°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "05:00", temp: "15°", icon: "solar:sun-bold-duotone" },
          { time: "06:00", temp: "17°", icon: "solar:sun-bold-duotone" },
          { time: "07:00", temp: "19°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "08:00", temp: "21°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "09:00", temp: "23°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "10:00", temp: "25°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "11:00", temp: "27°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "12:00", temp: "28°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "13:00", temp: "29°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "14:00", temp: "29°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "15:00", temp: "28°", icon: "solar:cloud-bold-duotone" },
          { time: "16:00", temp: "26°", icon: "solar:cloud-bold-duotone" },
          { time: "17:00", temp: "24°", icon: "solar:cloud-bold-duotone" },
          { time: "18:00", temp: "22°", icon: "solar:moon-bold-duotone" },
          { time: "19:00", temp: "21°", icon: "solar:moon-bold-duotone" },
          { time: "20:00", temp: "20°", icon: "solar:moon-bold-duotone" },
          { time: "21:00", temp: "19°", icon: "solar:cloud-bold-duotone" },
          { time: "22:00", temp: "18°", icon: "solar:cloud-bold-duotone" },
          { time: "23:00", temp: "17°", icon: "solar:moon-bold-duotone" },
        ],

        forecast10Days: [
          {
            day: "یکشنبه",
            icon: "solar:cloud-sun-bold-duotone",
            min: "15°",
            max: "28°",
            sunrise: "05:20",
            sunset: "19:30",
            humidity: "20%",
            wind: "10 km/h",
            feels: "26°",
            description: "کمی ابری و خنک",

            hourly: [
              { time: "00:00", temp: "16°", icon: "solar:cloud-bold-duotone" },
              { time: "06:00", temp: "17°", icon: "solar:sun-bold-duotone" },
              {
                time: "12:00",
                temp: "28°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              { time: "18:00", temp: "22°", icon: "solar:moon-bold-duotone" },
            ],
          },

          {
            day: "دوشنبه",
            icon: "solar:cloud-bold-duotone",
            min: "14°",
            max: "27°",
            sunrise: "05:21",
            sunset: "19:29",
            humidity: "25%",
            wind: "12 km/h",
            feels: "25°",
            description: "هوای نیمه ابری",

            hourly: [
              { time: "00:00", temp: "15°", icon: "solar:cloud-bold-duotone" },
              {
                time: "06:00",
                temp: "18°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              { time: "12:00", temp: "27°", icon: "solar:cloud-bold-duotone" },
              { time: "18:00", temp: "21°", icon: "solar:moon-bold-duotone" },
            ],
          },

          {
            day: "سه‌شنبه",
            icon: "solar:sun-bold-duotone",
            min: "16°",
            max: "30°",
            sunrise: "05:22",
            sunset: "19:28",
            humidity: "18%",
            wind: "9 km/h",
            feels: "28°",
            description: "صاف و آفتابی",

            hourly: [
              { time: "00:00", temp: "17°", icon: "solar:moon-bold-duotone" },
              { time: "06:00", temp: "19°", icon: "solar:sun-bold-duotone" },
              { time: "12:00", temp: "30°", icon: "solar:sun-bold-duotone" },
              { time: "18:00", temp: "23°", icon: "solar:cloud-bold-duotone" },
            ],
          },
        ],
      },

      {
        city: "مزار شریف",

        temperature: "31°",
        condition: "صاف",
        icon: "solar:sun-bold-duotone",

        humidity: "16%",
        wind: "14 km/h",
        feels: "30°",

        sunrise: "05:25",
        sunset: "19:35",

        hourly: [
          { time: "00:00", temp: "21°", icon: "solar:moon-bold-duotone" },
          { time: "03:00", temp: "19°", icon: "solar:cloud-bold-duotone" },
          { time: "06:00", temp: "23°", icon: "solar:sun-bold-duotone" },
          { time: "09:00", temp: "28°", icon: "solar:sun-bold-duotone" },
          { time: "12:00", temp: "32°", icon: "solar:sun-bold-duotone" },
          { time: "15:00", temp: "33°", icon: "solar:sun-bold-duotone" },
          { time: "18:00", temp: "28°", icon: "solar:cloud-bold-duotone" },
          { time: "21:00", temp: "24°", icon: "solar:moon-bold-duotone" },
        ],

        forecast10Days: [
          {
            day: "یکشنبه",
            icon: "solar:sun-bold-duotone",
            min: "18°",
            max: "32°",
            sunrise: "05:25",
            sunset: "19:35",
            humidity: "16%",
            wind: "14 km/h",
            feels: "30°",
            description: "صاف و گرم",

            hourly: [
              { time: "00:00", temp: "21°", icon: "solar:moon-bold-duotone" },
              { time: "06:00", temp: "23°", icon: "solar:sun-bold-duotone" },
              { time: "12:00", temp: "32°", icon: "solar:sun-bold-duotone" },
              { time: "18:00", temp: "28°", icon: "solar:cloud-bold-duotone" },
            ],
          },

          {
            day: "دوشنبه",
            icon: "solar:cloud-sun-bold-duotone",
            min: "17°",
            max: "30°",
            sunrise: "05:26",
            sunset: "19:34",
            humidity: "20%",
            wind: "13 km/h",
            feels: "29°",
            description: "کمی ابری",

            hourly: [
              { time: "00:00", temp: "20°", icon: "solar:cloud-bold-duotone" },
              {
                time: "06:00",
                temp: "22°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              {
                time: "12:00",
                temp: "30°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              { time: "18:00", temp: "26°", icon: "solar:moon-bold-duotone" },
            ],
          },

          {
            day: "سه‌شنبه",
            icon: "solar:sun-bold-duotone",
            min: "19°",
            max: "33°",
            sunrise: "05:27",
            sunset: "19:33",
            humidity: "15%",
            wind: "11 km/h",
            feels: "31°",
            description: "آفتابی",

            hourly: [
              { time: "00:00", temp: "22°", icon: "solar:moon-bold-duotone" },
              { time: "06:00", temp: "24°", icon: "solar:sun-bold-duotone" },
              { time: "12:00", temp: "33°", icon: "solar:sun-bold-duotone" },
              { time: "18:00", temp: "29°", icon: "solar:cloud-bold-duotone" },
            ],
          },
        ],
      },

      {
        city: "قندهار",

        temperature: "36°",
        condition: "آفتابی",
        icon: "solar:sun-bold-duotone",

        humidity: "10%",
        wind: "13 km/h",
        feels: "35°",

        sunrise: "05:35",
        sunset: "19:40",

        hourly: [
          { time: "00:00", temp: "24°", icon: "solar:moon-bold-duotone" },
          { time: "06:00", temp: "26°", icon: "solar:sun-bold-duotone" },
          { time: "12:00", temp: "36°", icon: "solar:sun-bold-duotone" },
          { time: "18:00", temp: "31°", icon: "solar:cloud-bold-duotone" },
        ],

        forecast10Days: [
          {
            day: "یکشنبه",
            icon: "solar:sun-bold-duotone",
            min: "22°",
            max: "36°",
            sunrise: "05:35",
            sunset: "19:40",
            humidity: "10%",
            wind: "13 km/h",
            feels: "35°",
            description: "آسمان صاف و گرم",
            hourly: [
              { time: "00:00", temp: "24°", icon: "solar:moon-bold-duotone" },
              { time: "06:00", temp: "26°", icon: "solar:sun-bold-duotone" },
              { time: "12:00", temp: "36°", icon: "solar:sun-bold-duotone" },
              { time: "18:00", temp: "31°", icon: "solar:cloud-bold-duotone" },
            ],
          },

          {
            day: "دوشنبه",
            icon: "solar:sun-bold-duotone",
            min: "23°",
            max: "37°",
            sunrise: "05:36",
            sunset: "19:39",
            humidity: "12%",
            wind: "15 km/h",
            feels: "36°",
            description: "صاف و گرم",
            hourly: [
              { time: "00:00", temp: "25°", icon: "solar:moon-bold-duotone" },
              { time: "06:00", temp: "27°", icon: "solar:sun-bold-duotone" },
              { time: "12:00", temp: "37°", icon: "solar:sun-bold-duotone" },
              { time: "18:00", temp: "32°", icon: "solar:cloud-bold-duotone" },
            ],
          },

          {
            day: "سه‌شنبه",
            icon: "solar:cloud-sun-bold-duotone",
            min: "21°",
            max: "35°",
            sunrise: "05:37",
            sunset: "19:38",
            humidity: "15%",
            wind: "12 km/h",
            feels: "34°",
            description: "کمی ابری همراه با گرما",
            hourly: [
              { time: "00:00", temp: "23°", icon: "solar:cloud-bold-duotone" },
              {
                time: "06:00",
                temp: "26°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              { time: "12:00", temp: "35°", icon: "solar:sun-bold-duotone" },
              { time: "18:00", temp: "30°", icon: "solar:moon-bold-duotone" },
            ],
          },
        ],
      },

      {
        city: "ننگرهار",

        temperature: "33°",
        condition: "کمی ابری",
        icon: "solar:cloud-sun-bold-duotone",

        humidity: "30%",
        wind: "9 km/h",
        feels: "34°",

        sunrise: "05:15",
        sunset: "19:25",

        hourly: [
          { time: "00:00", temp: "23°", icon: "solar:cloud-bold-duotone" },
          { time: "06:00", temp: "25°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "12:00", temp: "33°", icon: "solar:cloud-sun-bold-duotone" },
          { time: "18:00", temp: "29°", icon: "solar:moon-bold-duotone" },
        ],

        forecast10Days: [
          {
            day: "یکشنبه",
            icon: "solar:cloud-sun-bold-duotone",
            min: "20°",
            max: "33°",
            sunrise: "05:15",
            sunset: "19:25",
            humidity: "30%",
            wind: "9 km/h",
            feels: "34°",
            description: "کمی ابری و گرم",
            hourly: [
              { time: "00:00", temp: "23°", icon: "solar:cloud-bold-duotone" },
              {
                time: "06:00",
                temp: "25°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              {
                time: "12:00",
                temp: "33°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              { time: "18:00", temp: "29°", icon: "solar:moon-bold-duotone" },
            ],
          },

          {
            day: "دوشنبه",
            icon: "solar:cloud-bold-duotone",
            min: "21°",
            max: "32°",
            sunrise: "05:16",
            sunset: "19:24",
            humidity: "32%",
            wind: "11 km/h",
            feels: "33°",
            description: "هوای آرام",
            hourly: [
              { time: "00:00", temp: "22°", icon: "solar:cloud-bold-duotone" },
              {
                time: "06:00",
                temp: "24°",
                icon: "solar:cloud-sun-bold-duotone",
              },
              { time: "12:00", temp: "32°", icon: "solar:cloud-bold-duotone" },
              { time: "18:00", temp: "28°", icon: "solar:moon-bold-duotone" },
            ],
          },

          {
            day: "سه‌شنبه",
            icon: "solar:sun-bold-duotone",
            min: "22°",
            max: "34°",
            sunrise: "05:17",
            sunset: "19:23",
            humidity: "28%",
            wind: "10 km/h",
            feels: "35°",
            description: "آفتابی",
            hourly: [
              { time: "00:00", temp: "23°", icon: "solar:moon-bold-duotone" },
              { time: "06:00", temp: "26°", icon: "solar:sun-bold-duotone" },
              { time: "12:00", temp: "34°", icon: "solar:sun-bold-duotone" },
              { time: "18:00", temp: "30°", icon: "solar:cloud-bold-duotone" },
            ],
          },
        ],
      },
    ],
  },
];
export default weatherData;
