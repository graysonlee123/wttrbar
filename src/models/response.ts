import z from "zod";

const CurrentConditionSchema = z.object({
  FeelsLikeC: z.string(),
  FeelsLikeF: z.string(),
  cloudcover: z.string(),
  humidity: z.string(),
  localObsDateTime: z.string(),
  observation_time: z.string(),
  precipInches: z.string(),
  precipMM: z.string(),
  pressure: z.string(),
  pressureInches: z.string(),
  temp_C: z.string(),
  temp_F: z.string(),
  uvIndex: z.string(),
  visibility: z.string(),
  visibilityMiles: z.string(),
  weatherCode: z.string(),
  weatherDesc: z
    .object({
      value: z.string(),
    })
    .array(),
  weatherIconUrl: z
    .object({
      value: z.string(),
    })
    .array(),
  winddir16Point: z.string(),
  winddirDegree: z.string(),
  windspeedKmph: z.string(),
  windspeedMiles: z.string(),
});

const AreaSchema = z.object({
  areaName: z
    .object({
      value: z.string(),
    })
    .array(),
  country: z
    .object({
      value: z.string(),
    })
    .array(),
  latitude: z.string(),
  longitude: z.string(),
  population: z.string(),
  region: z
    .object({
      value: z.string(),
    })
    .array(),
  weatherUrl: z
    .object({
      value: z.string(),
    })
    .array(),
});

const RequestSchema = z.object({
  query: z.string(),
  type: z.string(),
});

const WeatherSchema = z.object({
  astronomy: z
    .object({
      moon_illumination: z.string(),
      moon_phase: z.string(),
      moonrise: z.string(),
      moonset: z.string(),
      sunrise: z.string(),
      sunset: z.string(),
    })
    .array(),
  avgtempC: z.string(),
  avgtempF: z.string(),
  date: z.string(),
  hourly: z
    .object({
      chanceoffog: z.string(),
      chanceoffrost: z.string(),
      chanceofhightemp: z.string(),
      chanceofovercast: z.string(),
      chanceofrain: z.string(),
      chanceofremdry: z.string(),
      chanceofsnow: z.string(),
      chanceofsunshine: z.string(),
      chanceofthunder: z.string(),
      chanceofwindy: z.string(),
      cloudcover: z.string(),
      DewPointC: z.string(),
      DewPointF: z.string(),
      diffRad: z.string(),
      FeelsLikeC: z.string(),
      FeelsLikeF: z.string(),
      HeatIndexC: z.string(),
      HeatIndexF: z.string(),
      humidity: z.string(),
      precipInches: z.string(),
      precipMM: z.string(),
      pressure: z.string(),
      pressureInches: z.string(),
      shortRad: z.string(),
      tempC: z.string(),
      tempF: z.string(),
      time: z.string(),
      uvIndex: z.string(),
      visibility: z.string(),
      visibilityMiles: z.string(),
      weatherCode: z.string(),
      weatherDesc: z
        .object({
          value: z.string(),
        })
        .array(),
      weatherIconUrl: z.object({ value: z.string() }).array(),
      WindChillC: z.string(),
      WindChillF: z.string(),
      winddir16Point: z.string(),
      winddirDegree: z.string(),
      WindGustKmph: z.string(),
      WindGustMiles: z.string(),
      windspeedKmph: z.string(),
      windspeedMiles: z.string(),
    })
    .array(),
  maxtempC: z.string(),
  maxtempF: z.string(),
  mintempC: z.string(),
  mintempF: z.string(),
  sunHour: z.string(),
  totalSnow_cm: z.string(),
  uvIndex: z.string(),
});

export const ResponseSchema = z.object({
  current_condition: CurrentConditionSchema.array(),
  nearest_area: AreaSchema.array(),
  request: RequestSchema.array(),
  weather: WeatherSchema.array(),
});
