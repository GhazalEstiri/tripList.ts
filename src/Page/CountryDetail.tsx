import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { getWeather } from "../Services/Api.js";
import { FavoriteContext } from "../Context/Favorite.js";
import {
  Heart,
  MapPin,
  Landmark,
  UserGroup,
  Scan,
  Languages,
  BadgeDollarSign,
  Wind,
} from "lucide-react";

interface Country {
  name: string;
  flags: {
    png: string;
  };
  latlng: [number,number];
  region: string;
  capital: string;
  population: number;
  area: number;
  languages: {
    name: string;
  }[];
  currencies: {
    name: string;
  }[];
}
interface Weather {
  latitude: number;
  longitude: number;
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

function CountryDetail() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedCountry = location.state as Country;

  const { favorite, addFavorite, showLoginModal, setShowLoginModal } =
    useContext(FavoriteContext);

  const isFavorite = favorite?.some((item) => {
    return (
      item.latlng &&
      selectedCountry?.latlng &&
      item.latlng[0] === selectedCountry.latlng[0] &&
      item.latlng[1] === selectedCountry.latlng[1]
    );
  });

  async function handleClickCountry(selectedCountry: Country) {
    try {
      setLoading(true);
      setError("");

      console.log(selectedCountry);

      const latitude = selectedCountry.latlng[0];
      const longitude = selectedCountry.latlng[1];
      console.log(selectedCountry);

      const weatherData = await getWeather(latitude, longitude);
      setWeather(weatherData);
    } catch (error) {
      setError("nothing found");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    handleClickCountry(selectedCountry);
  }, [selectedCountry]);

  function handleFavoriteClick() {
    if (!showLoginModal) {
      addFavorite(selectedCountry);
    }
    if (!isFavorite && showLoginModal) {
      (document.getElementById("my_modal_1") as HTMLDialogElement).showModal();
    }
  }
  function getWeatherStatus(code: number) {
    if (code === 0) return "Clear Sky";
    if (code === 1) return "Mainly Clear";
    if (code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";

    if ([45, 48].includes(code)) return "Fog";

    if ([51, 53, 55].includes(code)) return "Drizzle";

    if ([61, 63, 65].includes(code)) return "Rain";

    if ([71, 73, 75].includes(code)) return "Snow";

    if ([80, 81, 82].includes(code)) return "Rain Showers";

    if (code === 95) return "Thunderstorm";

    return "Unknown";
  }

  return (
    <div className=" text-black md:h-195 h-full  bg-[#f8fafb] flex justify-center items-center mx-auto">
      <div className="flex w-full h-full items-center justify-center overflow-hidden relative flex-col">
        <img
          src="Whole_world_-_land_and_oceans.jpg"
          className="
             absolute 
             hidden
             md:flex
             w-full 
             h-95
             top-0
             object-cover
             object-center
             [clip-path:polygon(100%_0%,0%_0%,0.00%_37.13%,1.00%_36.92%,2.00%_37.05%,3.00%_37.53%,4.00%_38.33%,5.00%_39.44%,6.00%_40.83%,7.00%_42.47%,8.00%_44.32%,9.00%_46.33%,10.00%_48.45%,11.00%_50.63%,12.00%_52.81%,13.00%_54.95%,14.00%_56.99%,15.00%_58.88%,16.00%_60.57%,17.00%_62.02%,18.00%_63.19%,19.00%_64.07%,20.00%_64.61%,21.00%_64.82%,22.00%_64.69%,23.00%_64.22%,24.00%_63.41%,25.00%_62.30%,26.00%_60.91%,27.00%_59.27%,28.00%_57.42%,29.00%_55.41%,30.00%_53.30%,31.00%_51.12%,32.00%_48.93%,33.00%_46.79%,34.00%_44.76%,35.00%_42.87%,36.00%_41.18%,37.00%_39.73%,38.00%_38.55%,39.00%_37.68%,40.00%_37.13%,41.00%_36.92%,42.00%_37.05%,43.00%_37.53%,44.00%_38.33%,45.00%_39.44%,46.00%_40.83%,47.00%_42.47%,48.00%_44.32%,49.00%_46.33%,50.00%_48.45%,51.00%_50.63%,52.00%_52.81%,53.00%_54.95%,54.00%_56.99%,55.00%_58.88%,56.00%_60.57%,57.00%_62.02%,58.00%_63.19%,59.00%_64.07%,60.00%_64.61%,61.00%_64.82%,62.00%_64.69%,63.00%_64.22%,64.00%_63.41%,65.00%_62.30%,66.00%_60.91%,67.00%_59.27%,68.00%_57.42%,69.00%_55.41%,70.00%_53.30%,71.00%_51.12%,72.00%_48.93%,73.00%_46.79%,74.00%_44.76%,75.00%_42.87%,76.00%_41.18%,77.00%_39.73%,78.00%_38.55%,79.00%_37.68%,80.00%_37.13%,81.00%_36.92%,82.00%_37.05%,83.00%_37.53%,84.00%_38.33%,85.00%_39.44%,86.00%_40.83%,87.00%_42.47%,88.00%_44.32%,89.00%_46.33%,90.00%_48.45%,91.00%_50.63%,92.00%_52.81%,93.00%_54.95%,94.00%_56.99%,95.00%_58.88%,96.00%_60.57%,97.00%_62.02%,98.00%_63.19%,99.00%_64.07%,100.00%_64.61%)]"
        />
        <div className="flex w-full max-w-7xl flex-col md:flex-row justify-around items-center mx-auto mt-10 md:mt-30 px-4 py-8 sm:px-6 md:p-10 bg-[#f8fafb] xl:mr-50 gap-10">
          <section className="flex flex-col relative mt-10 md:mt-30 gap-5 justify-center items-center mx-auto w-full">
            <div className="flex flex-col justify-center gap-0 lg:-ml-25 ">
              <div className="flex flex-row gap-5">
                <img
                  src={selectedCountry.flags.png}
                  alt=""
                  className="w-30 rounded-sm"
                />
                <div className="flex flex-col gap-3">
                  <h1 className="font-bold text-3xl text-[#1D4362]">
                    {selectedCountry.name}
                  </h1>

                  <div className="flex flex-row">
                    <p className=" w-10 h-10 flex justify-center items-center">
                      <MapPin className="text-[#1d4362c1]" />
                    </p>
                    <div className="flex flex-col justify-center gap-1 text-[#1d4362c1] ">
                      {/* <p className="flex flex-row font-bold">region</p> */}
                      <p className="font-medium">{selectedCountry.region}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="flex w-full max-w-150 flex-col justify-center items-center  bg-white border border-[#2a4c7141] p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm">
              <div className="grid place-items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-20 md:pr-5">
                <div className="flex flex-row justify-center items-center lg:gap-5 gap-2 ">
                  <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                    <Landmark className="text-[#1D4362]" />
                  </p>
                  <div className="flex flex-col justify-center gap-1  text-[#1D4362] lg:text-base text-sm">
                    <p className="flex flex-row font-bold">capital</p>
                    <p className="font-medium">{selectedCountry.capital}</p>
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center lg:gap-5 gap-1">
                  <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                    <UserGroup className="text-[#1D4362]" />
                  </p>
                  <div className="flex flex-col justify-center gap-1   text-[#1D4362] lg:text-base text-sm">
                    <p className="flex flex-row font-bold ">population</p>
                    <p className="font-medium">{selectedCountry.population}</p>
                  </div>
                </div>

                <div className="flex flex-row justify-center items-centerlg:gap-5 gap-1">
                  <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                    <Scan className="text-[#1D4362]" />
                  </p>
                  <div className="flex flex-col justify-center gap-1  text-[#1D4362] lg:text-base text-sm">
                    <p className="flex flex-row  font-bold">area</p>
                    <p className="font-medium">{selectedCountry.area} km</p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center lg:gap-5 gap-1">
                  <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                    <Languages className="text-[#1D4362]" />
                  </p>
                  <div className="flex flex-col justify-center gap-1  text-[#1D4362] lg:text-base text-sm">
                    <p className="flex flex-row  font-bold">languages</p>
                    <p className="font-medium">
                      {selectedCountry.languages[0]?.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-5">
                  <p className="bg-[#e4f0f7] rounded-full md:w-15 md:h-10 w-10 h-10 flex justify-center items-center">
                    <BadgeDollarSign className="text-[#1D4362]" />
                  </p>
                  <div className="flex flex-col justify-center gap-1  text-[#1D4362]">
                    <p className="flex flex-row  font-bold">currencies</p>
                    <p className="font-medium">
                      {selectedCountry.currencies[0]?.name}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <div className="flex w-full max-w-90 flex-col justify-center items-center mx-auto gap-5 md:mt-30">
            <button
              onClick={() => handleFavoriteClick()}
              className="flex w-full justify-center mt-10 md:justify-end "
            >
              {isFavorite ? (
                <Heart
                  fill="#084484"
                  className="text-[#084484] bg-[#e4f0f7] rounded-full p-2 flex justify-center items-center"
                  size={40}
                />
              ) : (
                <Heart
                  className="text-[#084484] bg-[#e4f0f7] rounded-full p-2 flex justify-center items-center"
                  size={40}
                />
              )}

              <div>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Login Required</h3>
                    <p className="py-4">login please</p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button
                          className="btn"
                          onClick={() => setShowLoginModal(false)}
                        >
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </button>
            <section className="flex h-auto min-h-70 w-full items-center justify-between rounded-3xl border border-[#2a4c7141] bg-white p-8 shadow-sm sm:p-10 md:p-12">
              {" "}
              {loading ? (
                <div className="text-center text-xl text-[#A8B6D8]">
                  <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center text-xl text-[#A8B6D8]">
                  {error}
                </div>
              ) : (
                weather && (
                  <div className="h-full flex flex-col justify-center items-center mx-auto">
                    <div className="flex pb-4 flex-col">
                      <p className="text-sm text-gray-500 font-medium">
                        Current Temperature
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-6xl font-bold text-[#1d4362]">
                          {weather.current.temperature_2m}
                        </span>

                        <span className="text-2xl text-gray-500">°C</span>
                      </div>

                      <p className="text-gray-600 font-medium mt-1">
                        {getWeatherStatus(weather.current.weather_code)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t  border-gray-200 pt-4 gap-5">
                      <div>
                        <p className="text-xs text-gray-400">Wind Speed</p>

                        <p className="text-lg font-bold text-[#1d4362]">
                          {weather.current.wind_speed_10m} km/h
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-[#1d4362]/10 flex items-center justify-center">
                        <Wind className="text-[#1D4362]" />
                      </div>
                    </div>
                  </div>
                )
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CountryDetail;
