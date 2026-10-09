const BASE_URL = "https://countries.dev";
const API_KEY = import.meta.env.VITE_API_KEY_COUNTRY;
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getCountry(limit:number, offset:number) {
  const response = await fetch(
    `${BASE_URL}/countries?fields=name%2Ccapital%2Cflag&full=true&sort=population&limit=${limit}&offset=${offset}`,
  );

  console.log(response.status);

  const data = await response.json();
  console.log("data:", data);

  return data;
}
export async function searchCountry(nameCountry:string) {
  const response = await fetch(`${BASE_URL}/name/${nameCountry}`);
  console.log(response.status);
  const data = await response.json();
  console.log("data:", data);

  return data;
}

export async function getWeather(latitude:number, longitude:number) {
  const response = await fetch(`${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&current_units=temperature_2m,wind_speed_10m`);
  console.log(response.status);

  const data = await response.json();

  console.log("weather:", data);

  return data;
}
