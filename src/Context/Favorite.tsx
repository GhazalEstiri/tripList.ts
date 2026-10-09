import { createContext, useState, useContext } from "react";
// import { useParams } from "react-router";
// import { getWeather } from "../Services/Api";
import { loginContext } from "./AuthContext.js";
import type { ReactNode } from "react";
// interface Favorite {
//   latlng: number[] | null;
// }
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
interface Favorites {
  favorite: Country[];
  addFavorite: (country: Country) => void;
  showLoginModal: boolean;
  setShowLoginModal: (showLoginModal: boolean) => void;
}
const initialState: Favorites = {
  favorite: [],
  addFavorite: () => {},
  showLoginModal: false,
  setShowLoginModal: () => {},
};
const FavoriteContext = createContext(initialState);

function Favorite({ children }: { children: ReactNode }) {
  const { user } = useContext(loginContext);
  const [favorite, setFavorite] = useState<Country[]>(() => {
    return JSON.parse(localStorage.getItem("favorite") ?? "[]");
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  function addFavorite(country:Country) {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    const isFavorite = favorite.some((item) => {
      return (
        item.latlng &&
        country.latlng &&
        item.latlng[0] === country.latlng[0] &&
        item.latlng[1] === country.latlng[1]
      );
    });
    if (isFavorite) {
      const newFavorite = favorite.filter((item) => {
        return (
          item.latlng &&
          country.latlng &&
          (item.latlng[0] !== country.latlng[0] ||
            item.latlng[1] !== country.latlng[1])
        );
      });
      setFavorite(newFavorite);
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
    } else {
      const newFavorite = [...favorite, country];
      setFavorite(newFavorite);
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
    }
  }

  return (
    <div>
      <FavoriteContext.Provider
        value={{ favorite, addFavorite, showLoginModal, setShowLoginModal }}
      >
        {children}
      </FavoriteContext.Provider>
    </div>
  );
}
export { FavoriteContext };
export default Favorite;
