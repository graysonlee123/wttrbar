import type { Environment } from "./env.js";
import { ResponseSchema } from "./models/response.js";

export default async function getWeather(env: Environment) {
  const url = `https://wttr.in/${env.LOCATION}?format=j1&u`;
  const response = await fetch(url);
  const json = await response.json();

  const parser = ResponseSchema.safeParse(json);
  if (!parser.success) {
    throw parser.error;
  }

  return parser.data;
}
