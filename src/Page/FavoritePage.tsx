import React, { useContext } from "react";
import { FavoriteContext } from "../Context/Favorite.js";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import Navbar from "./Navbar.js";
interface Country {
  name: string;
  flags: {
    png: string;
  };
  latlng: [number, number];
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
// interface Favorite {
//   favorite: Country[];
//   addFavorite: (country: Country) => void;
// }

function FavePage() {
  const { favorite, addFavorite } = useContext(FavoriteContext);
  // console.log("first item:", favorite[0]);
  // console.log("country name:", favorite[0].name);
  return (
    <section>
      <Navbar />
      <h1 className="font-bold text-3xl tracking-[0.25em] text-[#1d4362] flex justify-center items-center mt-10 mx-auto">
        Favorite
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-18 ">
        {favorite.length > 0 ? (
          favorite.map((item) => {
            return (
              <div
                key={item.name}
                className="bg-[#F7F9F8] shadow-xl flex p-10 font-bold text-[#1d4362] text-sm cursor-pointer rounded-2xl"
              >
                <div className="flex w-200 flex-col gap-8 justify-between">
                  <div key={item.flags.png}>
                    <img src={item.flags.png} alt={item.name} />
                  </div>
                  <div className="flex flex-col justify-center items-baseline w-full gap-6 ">
                    <Link
                      to="/CountryDetail"
                      key={item.name}
                      state={item}
                      className="line-clamp-1 text-center w-full"
                    >
                      {item.name}
                    </Link>

                    <div className=" flex justify-center items-center bg-[#E8F4FD] rounded-2xl p-2 text-sm text-[#1d4362]  mx-auto w-full">
                      More details <ChevronRight />
                    </div>
                  </div>
                </div>

                <button onClick={() => addFavorite(item)}></button>
              </div>
            );
          })
        ) : (
          <div>nothing found</div>
        )}
      </div>
    </section>
  );
}
export default FavePage;
