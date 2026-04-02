# wttrbar

Waybar custom module that fetches weather from [wttr.in](https://wttr.in) and outputs JSON.

## Output

```json
{
  "text": "72°",
  "alt": "sunny",
  "tooltip": "Feels like: 72°\rHumidity: 55%\rWind speed: 10mph"
}
```

`alt` is set to one of: `sunny`, `partly-cloudy`, `cloudy`, `very-cloudy`, `fog`, `light-showers`, `light-rain`, `heavy-showers`, `heavy-rain`, `light-sleet`, `light-sleet-showers`, `light-snow`, `light-snow-showers`, `heavy-snow`, `heavy-snow-showers`, `thundery-showers`, `thundery-heavy-rain`, `thundery-snow-showers`, `unknown`.

## Config

Set the `LOCATION` env var to a city name or coordinates recognized by wttr.in.

```json
"custom/weather": {
    "exec": "LOCATION='New York' wttrbar",
    "return-type": "json",
    "interval": 600,
    "format": "{icon} {}",
    "format-icons": {
        "sunny": "☀️",
        "partly-cloudy": "⛅",
        "cloudy": "🌥️",
        "very-cloudy": "☁️",
        "fog": "🌫️",
        "light-showers": "🌦️",
        "light-rain": "🌧️",
        "heavy-showers": "🌧️",
        "heavy-rain": "🌧️",
        "light-sleet": "🌨️",
        "light-sleet-showers": "🌨️",
        "light-snow": "🌨️",
        "light-snow-showers": "🌨️",
        "heavy-snow": "❄️",
        "heavy-snow-showers": "❄️",
        "thundery-showers": "⛈️",
        "thundery-heavy-rain": "⛈️",
        "thundery-snow-showers": "⛈️",
        "unknown": "🌡️"
    }
}
```

## Build

### Nix

```sh
nix build
```

Binary is placed at `result/bin/wttrbar`.

### Manual

```sh
pnpm install
pnpm build
LOCATION='New York' pnpm start
```

## Dev

```sh
nix develop  # or: nix-shell
```
