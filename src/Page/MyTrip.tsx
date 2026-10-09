import Navbar from "./Navbar.js";
import { getCountry } from "../Services/Api.js";
import { initialState, tripReducer } from "../Reducer/tripReducer.js";
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router";
import { UserRoundGroup, Wallet, Trash, Pencil } from "lucide-react";
import type { Dispatch } from "react";
import type { State, Action, Trip } from "../Reducer/tripReducer.js";
// import { useNavigate, useParams, Link } from "react-router";
type Mytrip = {
  state: State;
  dispatch: Dispatch<Action>;
};
type CountryOption = {
  name: string;
};
type Budget = {
  budget: number;
};
function MyTrip({ state, dispatch }: Mytrip) {
  const [country, setCountry] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedcountry] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [companion, setCompanion] = useState([""]);
  const [budget, setBudget] = useState<number|null>(null);
  const [editeCard, setEditeCard] = useState<Trip | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  // const navigate = useNavigate();
  // const { id } = useParams();

  async function getApi() {
    try {
      const limit = 250;
      const offset = 0;
      const countryData = await getCountry(limit, offset);
      console.log(countryData);
      setCountry(countryData);
    } catch (error) {
      console.log("API ERROR:", error);
    }
  }

  useEffect(() => {
    getApi();
  }, []);

  function addTrip() {
    const newTrip = {
      id: Date.now(),
      country: selectedCountry,
      // category: selectedCategory,
      companion: companion,
      budget: Number(budget),
      expenses: [],
      totalBudget: Number(budget),
    };
    dispatch({
      type: "ADD_TRIP",
      payload: newTrip,
    });

    setSelectedcountry("");
    // setSelectedCategory("");
    setCompanion([""]);
    setBudget(null);
    setEditeCard(null);

    // console.log("category:", selectedCategory);
  }

  function deleteCard(tripId: number) {
    dispatch({
      type: "DELETE_CARD",
      payload: tripId,
    });
    setShowUndo(true);

    setTimeout(() => {
      setShowUndo(false);
    }, 2000);
  }
  function editeCards(tripId: number) {
    const trip = state.trip.find((item) => item.id === tripId);
    if (!trip) return;
    setEditeCard(trip);
    setSelectedcountry(trip.country);
    // setSelectedCategory(trip.category);
    setCompanion(trip.companion);
    setBudget(trip.budget);
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement|null; modal?.showModal();
  }

  function undoTrip() {
    dispatch({
      type: "UNDO_CARD",
    });
    setShowUndo(false);
  }

  console.log(state);
  return (
    <section className="w-full flex flex-col">
      <Navbar />

      <section className="flex flex-col gap-10 md:flex-row  justify-between mt-10 w-[90%] mx-auto items-center lg:items-start">
        <div className=" flex gap-3 flex-col">
          <p className="text-[#9EB3C6] font-bold tracking-[3px]">MY TRIPS</p>
          <p className="text-[#112C43] text-4xl font-bold">Your Travel Plans</p>
          <p className="text-[#6486AA] font-bold text-4xl tracking-[3px] font-['Caveat']">
            Big dreams, more trips.
          </p>
          <p className="text-[#4b6581] text-lg font-medium">
            Keep track of your trips, manage your budget <br />
            and collect unforgettable moments.
          </p>
        </div>

        <div>
          {showUndo && (
            <button
              onClick={undoTrip}
              className="w-20 btn bg-[#144970] text-white text-lg rounded-xl p-5"
            >
              Undo
            </button>
          )}
          <button
            className="btn bg-[#144970] text-white text-lg rounded-xl p-5"
            onClick={() =>{ const modal = document.getElementById("my_modal_1") as HTMLDialogElement|null; modal?.showModal()}}
          >
            <p
              className="
            flex flex-row items-center place-items-center justify-center mx-auto gap-2 "
            >
              <span className=" ">+</span> Add Trip
            </p>
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box flex flex-col border-2 border-[#144970] gap-5">
              <div className="">
                <select
                  name="country"
                  id="country"
                  className="select [&::picker(select)]:max-h-26 w-full rounded-xl border border-[#144970] bg-[#fbfcfd]  text-sm outline-none focus:border-[#173c5c] transition"
                  value={selectedCountry}
                  onChange={(e) => setSelectedcountry(e.target.value)}
                >
                  <option value="">defult</option>
                  {country.length > 0 ? (
                    country.map((item) => {
                      return (
                        <option value={item.name} key={item.name} className="">
                          {item.name}
                        </option>
                      );
                    })
                  ) : (
                    <option value="empty">empty</option>
                  )}
                </select>
              </div>
              {/* <div>
                <select
                  name="category"
                  id="category"
                  value={selectedCategory}
                  className="select [&::picker(select)]:max-h-26 w-full rounded-xl border border-[#144970] bg-[#fbfcfd]  text-sm outline-none focus:border-[#173c5c] transition"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Tickets">Tickets</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Food">Food</option>
                  <option value="Leisure">Leisure</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div> */}
              <div className="flex flex-row w-full  justify-between gap-5">
                <div className="join grid grid-cols-1 gap-2">
                  {companion.length > 0 &&
                    companion.map((person, index) => {
                      return (
                        <div className="">
                          <input
                            className="input join-item w-100 outline-none  rounded-xl bg-[#fbfcfd] "
                            placeholder="Companion"
                            value={person}
                            key={index}
                            onChange={(e) => {
                              const newCompanion = companion.map((item, i) => {
                                if (i === index) {
                                  return e.target.value;
                                }
                                return item;
                              });
                              setCompanion(newCompanion);
                            }}
                          />
                        </div>
                      );
                    })}
                </div>
                <button
                  className="btn join-item rounded-xl btn-primary bg-[#144970] btn-block shadow-[#144970] shadow-sm w-10 mx-auto"
                  onClick={() => setCompanion([...companion, ""])}
                >
                  +
                </button>
              </div>
              <div className="join ">
                <input
                  className="input join-item  w-full outline-none  rounded-2xl bg-[#fbfcfd] "
                  placeholder="budget"
                  type="number"
                  value={budget??""}
                  onChange={(e) => setBudget(e.target.value===""?null: Number(e.target.value))}
                />
                {/* <button className="btn join-item rounded-r-full">+</button> */}
              </div>

              <div className="modal-action">
                <form
                  method="dialog"
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (editeCard) {
                      dispatch({
                        type: "EDIT_TRIP",
                        payload: {
                          tripId: editeCard.id,
                          country: selectedCountry,
                          // category: selectedCategory,
                          companion: companion,
                          budget: Number(budget),
                        },
                      });
                    } else {
                      addTrip();
                    }
                     const modal =document.getElementById("my_modal_1" ) as HTMLDialogElement; modal?.close();
                    setSelectedcountry("");
                    // setSelectedCategory("");
                    setCompanion([""]);
                    setBudget(null);
                    setEditeCard(null);
                  }}
                >
                  <button className="btn btn-primary bg-[#144970] btn-block shadow-[#144970] shadow-sm w-30 mx-auto ">
                    Add Trip
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </section>
      <div className="flex flex-row  ">
        <section className="bg-white w-[95%] grid  grid-cols-1 md:grid-cols-2  xl:grid-cols-3 p-15 gap-10 place-items-center">
          {state.trip.length > 0 ? (
            state.trip.map((trip) => {
              return (
                <div className="flex flex-col">
                  <div className="card p-4 mt-4 w-full">
                    <div className="card w-65 md:w-80 lg:w-96 bg-base-100 shadow-sm">
                      <div className="card-body">
                        {/* <span className="badge badge-lg  bg-[#EAF3F8] text-[#1D4362] rounded-2xl p-4">
                          {trip.category}
                        </span> */}
                        <div className="flex justify-between">
                          <h2 className="text-3xl font-bold text-[#1D4362] line-clamp-1">
                            {trip.country}
                          </h2>
                          <div className="flex flex-row justify-between gap-2">
                            <button
                              className=" bg-white text-[#144970] btn-block shadow-[#144970] shadow-sm w-10 h-10 rounded-full  mx-auto cursor-pointer"
                              onClick={() => deleteCard(trip.id)}
                            >
                              <Trash className="mx-auto" />
                            </button>
                            <button
                              className=" bg-white text-[#144970] btn-block shadow-[#144970] shadow-sm w-10 h-10 rounded-full mx-auto cursor-pointer"
                              onClick={() => editeCards(trip.id)}
                            >
                              <Pencil className="mx-auto" />
                            </button>
                          </div>
                          {/* <span className="text-xl">{trip.budget}</span> */}
                        </div>
                        <ul className="mt-6 flex flex-col gap-2 text-xs">
                          <li className=" flex flex-row items-center gap-5 text-[#668096]">
                            <span>
                              <UserRoundGroup />
                            </span>
                            <span>{trip.companion.join(", ")}</span>
                          </li>
                          <li className=" flex flex-row items-center gap-5 text-[#668096]">
                            <span>
                              <Wallet />
                            </span>
                            <span>{trip.budget}</span>
                          </li>
                        </ul>
                        <div className="mt-6">
                          <button className="btn btn-primary bg-[#144970] btn-block shadow-[#144970] shadow-sm">
                            <Link key={trip.id} to={`/TripDetail/${trip.id}`}>
                              More Details
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>nothing here</p>
          )}
        </section>
      </div>
    </section>
  );
}
export default MyTrip;
