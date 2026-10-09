import { useEffect } from "react";
import "./App.css";
import Home from "./Page/Home.js";
import { BrowserRouter, Route, Routes } from "react-router";
import CountryDetail from "./Page/CountryDetail.js";
import FavePage from "./Page/FavoritePage.js";
import Login from "./Page/Login.js";
import Countries from "./Page/Country.js";
import Profile from "./Page/Profile.js";
import MyTrip from "./Page/MyTrip.js";
import TripDetail from "./Page/TripDetail.js";
import { useReducer } from "react";
import { initialState, tripReducer } from "./Reducer/tripReducer.js";
function App() {
  const [state, dispatch] = useReducer(
    tripReducer,
    initialState,
    (initialState) => {
      const savedTrips = localStorage.getItem("trips");

      return savedTrips ? { trip: JSON.parse(savedTrips) } : initialState;
    },
  );
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(state.trip));
  }, [state.trip]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CountryDetail" element={<CountryDetail />} />
          <Route path="/Favorite" element={<FavePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Countries" element={<Countries />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/MyTrip"
            element={<MyTrip state={state} dispatch={dispatch} />}
          />
          <Route
            path="/TripDetail/:id"
            element={<TripDetail state={state} dispatch={dispatch} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
