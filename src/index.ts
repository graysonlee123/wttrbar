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

    console.log(
      JSON.stringify({
        text: `${current.FeelsLikeF}°`,
        alt: weatherCategory(current.weatherCode),
        tooltip: `Feels like: ${current.FeelsLikeF}°\rHumidity: ${current.humidity}%\rWind speed: ${current.windspeedMiles}mph`,
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
