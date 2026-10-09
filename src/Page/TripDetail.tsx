import { NavLink, useParams } from "react-router";
import { useState } from "react";
import Navbar from "./Navbar.js";
import { UserRoundGroup, Wallet, MapPin } from "lucide-react";
import type { Dispatch } from "react";
import type { State, Action, Trip,Expense } from "../Reducer/tripReducer.js";
type TripDetail = {
  state: State;
  dispatch: Dispatch<Action>;
};
function TripDetail({ state, dispatch }:TripDetail) {
  const { id } = useParams();
  const [amount, setAmount] = useState<number|null>();
  const [reason, setReason] = useState("");
  const [companion, setCompanion] = useState([""]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState<Expense|null>(null);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [showUndo, setShowUndo] = useState(false);

  const trip = state.trip.find((item) => item.id === Number(id));
  if (!trip) {
    return <p>Trip not found</p>;
  }
  const tripId = trip.id

  function addExpense() {
    if (editingExpense) {
      dispatch({
        type: "EDIT_ITEM",
        payload: {
          tripId: tripId,
          expenseId: editingExpense.id,
          category: selectedCategory,
          amount: Number(amount),
          reason: reason,
          companion: companion,
        },
      });
      setEditingExpense(null);
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: {
          tripId: tripId,
          category: selectedCategory,
          amount: Number(amount),
          reason: reason,
          companion: companion,
        },
      });
    }
    setReason("");
    setAmount(null);
    setCompanion([""]);
    setSelectedCategory("");
  }
  const budget =trip.budget
  function deleteItem(tripId:number, expenseId:number, amount:number) {
    dispatch({
      type: "DELETE_ITEM",

      payload: {
        tripId: tripId,
        expenseId: expenseId,
        amount: amount,
        budget:budget,
      },
    });
    setShowUndo(true);
    setTimeout(() => {
      setShowUndo(false);
    }, 2000);
  }
  function editeItem(expense:Expense) {
    setEditingExpense(expense);
    setAmount(expense.amount);
    setCompanion(expense.companion);
    setReason(expense.reason);
    setSelectedCategory(expense.category);
  }

  function undoItem() {
    dispatch({
      type: "UNDO_ITEM",
    });
    setShowUndo(false);
  }

  const filteredExpenses = trip.expenses.filter(
    (expense) =>
      expense.category === filteredCategory || filteredCategory === "",
  );
  return (
    <section className="flex flex-col">
      <div>
        <Navbar />
      </div>
      <div>
        <div className="card w-[90%] flex justify-center items-center mx-auto shadow-sm mt-10 bg-[#FBFCFD]">
          <div className="card-body w-full flex justify-around">
            <div className="flex justify-between md:flex-row flex-col gap-10 md:gap-0 mb-5">
              <h2 className="text-3xl font-bold text-[#1D4362] line-clamp-1 flex flex-row items-center gap-3">
                <span>
                  <MapPin />
                </span>
                {trip.country}
              </h2>
              {/* <span className="badge badge-lg  bg-[#EAF3F8] text-[#1D4362] rounded-2xl p-4">
                {trip.category}
              </span> */}
              {/* <span className="text-xl">{trip.budget}</span> */}
              <div>
                <select
                  name="category"
                  id="category"
                  value={filteredCategory}
                  className="select [&::picker(select)]:max-h-30 w-30 h-12  p-2 rounded-xl bg-[#1D4362] text-white font-medium hover:bg-[#001f49] transition cursor-pointer mr-20"
                  onChange={(e) => setFilteredCategory(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Tickets">Tickets</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Food">Food</option>
                  <option value="Leisure">Leisure</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-10 md:gap-0 justify-between">
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li className=" flex flex-row items-center gap-5 text-[#668096]">
                  <span>
                    <UserRoundGroup />
                  </span>
                  <span>{trip.companion.join(", ")}</span>
                </li>
              </ul>
              <div className=" flex flex-row items-center gap-5 text-[#668096]">
                <span>
                  <Wallet />
                </span>
                <span className="flex flex-col gap-2 ">
                  <span className="font-bold">Remaining Budget:</span>{" "}
                  <span>{trip.budget}</span>
                  <progress
                    className="progress md:w-56 w-40"
                    value={trip.budget}
                    max={trip.totalBudget}
                  ></progress>
                </span>
              </div>
            </div>
          </div>
        </div>
        {showUndo && (
          <button
            onClick={undoItem}
            className="w-20 mt-5 ml-20 h-12  p-2 rounded-xl bg-[#093775] text-white font-medium hover:bg-[#001f49] transition"
          >
            Undo
          </button>
        )}
        <div className="flex md:flex-row flex-col w-[90%] justify-center items-center mx-auto mt-20 gap-5">
          <input
            type="number"
            placeholder="Amount"
            value={amount??""}
            onChange={(e) => setAmount(e.target.value===""? null:Number(e.target.value) )}
            className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
          />
          <input
            type="text"
            placeholder="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
          />
          <input
            type="text"
            placeholder="companion"
            value={companion[0]??[]}
            onChange={(e) => setCompanion([e.target.value])}
            className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
          />
          <div className="w-full">
            <select
              name="category"
              id="category"
              value={selectedCategory}
              className="select [&::picker(select)]:max-h-30 w-full md:w-50 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Tickets">Tickets</option>
              <option value="Hotel">Hotel</option>
              <option value="Food">Food</option>
              <option value="Leisure">Leisure</option>
              <option value="Transportation">Transportation</option>
            </select>
          </div>
          <button
            onClick={addExpense}
            className="w-full md:w-70 h-12  p-2 rounded-xl bg-[#093775] text-white font-medium hover:bg-[#001f49] transition"
          >
            {editingExpense ? "Save" : "Add"}
          </button>
        </div>

        <div className="flex gap-5 flex-col w-[91%] mx-auto mt-20">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex md:flex-row flex-col justify-between w-full gap-5"
            >
              <p className="w-full md:w-60 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] text-sm flex justify-center items-center mx-auto">
                {expense.category}
              </p>
              <p className="w-full md:w-92 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd]  text-sm flex justify-center items-center mx-auto">
                {expense.amount}
              </p>
              <p className=" w-full md:w-92 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd]  text-sm flex justify-center items-center mx-auto">
                {expense.reason}
              </p>
              <p className="w-full md:w-92 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd]  text-sm flex justify-center items-center mx-auto">
                {expense.companion}
              </p>
              <button
                onClick={() => deleteItem(trip.id, expense.id, expense.amount)}
                className="md:w-50 h-12  p-2 rounded-xl bg-[#093775] text-white font-medium hover:bg-[#001f49] transition md:ml-10 cursor-pointer"
              >
                delete
              </button>
              <button
                className="md:w-50 h-12  p-2 rounded-xl bg-[#093775] text-white font-medium hover:bg-[#001f49] transition cursor-pointer"
                onClick={() => editeItem(expense)}
              >
                edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TripDetail;
