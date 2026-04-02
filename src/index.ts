import z, { ZodError } from "zod";
import EnvironmentSchema from "./env.js";
import getWeather from "./getWeather.js";
import weatherCategory from "./weatherCategory.js";

async function main() {
  try {
    const config = EnvironmentSchema.parse(process.env);
    const weather = await getWeather(config);

    const current = weather.current_condition[0];
    if (!current) throw new Error("No current condition data");

    const today = weather.weather[0];
    if (!today) throw new Error("No forecast data");

    const area = weather.nearest_area[0];
    const location = area
      ? `${area.areaName[0]?.value}, ${area.region[0]?.value}, ${area.country[0]?.value}`
      : "";

    const astronomy = today.astronomy[0];
    const description = current.weatherDesc.map((d) => d.value).join(", ");

    const tooltip = [
      `<b>${location}</b>`,
      "",
      `<b>Current conditions</b>`,
      description,
      `Observed: ${current.localObsDateTime}`,
      `Feels like: ${current.FeelsLikeF}°`,
      `Humidity: ${current.humidity}%`,
      `Wind: ${current.windspeedMiles}mph ${current.winddir16Point}`,
      "",
      `<b>Today</b>`,
      `High: ${today.maxtempF}° / Low: ${today.mintempF}°`,
      `Sun hours: ${today.sunHour}`,
      ...(astronomy
        ? [`Sunrise: ${astronomy.sunrise} / Sunset: ${astronomy.sunset}`]
        : []),
    ].join("\r");

    console.log(
      JSON.stringify({
        text: `${current.FeelsLikeF}°`,
        alt: weatherCategory(current.weatherCode),
        tooltip,
      }),
    );

    process.exit(0);
  } catch (error) {
    if (error instanceof ZodError) {
      const pretty = z.prettifyError(error);
      console.error(pretty);
    } else {
      console.error("An unknown error occurred", error);
    }

    process.exit(1);
  }
}

main();
