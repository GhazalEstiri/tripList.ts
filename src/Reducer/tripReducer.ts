const initialState:State = {
  trip: [],
  deletedExpense: null,
  deletedCard: null,
};
export type Action =
  | {
      type: "ADD_TRIP";
      payload: {
        id: number;
        country: string;
        budget: number;
        expenses: Expense[];
        companion: string[];
        // amount:number;
        totalBudget: number;
      };
    }
  | {
      type: "ADD_EXPENSE";
      payload: {
        tripId: number;
        category: string;
        amount: number;
        reason: string;
        companion: string[];
      };
    }
  | {
      type: "DELETE_CARD";
      payload: number;
    }
  | {
      type: "DELETE_ITEM";
      payload: {
        tripId: number;
        expenseId: number;
        // expense:Expense[];
        amount: number;
        budget: number;
      };
    }
  | {
      type: "EDIT_TRIP";
      payload: {
        tripId: number;
        // category: string;
        country: string;
        companion: string[];
        budget: number;
      };
    }
  | {
      type: "EDIT_ITEM";
      payload: {
        tripId: number;
        expenseId: number;
        category: string;
        amount: number;
        reason: string;
        companion: string[];
      };
    }
  | { type: "UNDO_ITEM"; }
  | { type: "UNDO_CARD"; };
export type Expense = {
  id: number;
  // tripId?:number;
  category: string;
  amount: number;
  reason: string;
  // expenseId: number;
  companion: string[];
};
export type Trip = {
  id: number;
  budget: number;
  expenses: Expense[];
  country:string;
  companion:string[];
  totalBudget:number;
};
export type State = {
  trip: Trip[];
  deletedExpense: {
    tripId: number;
    expense: Expense;
  } | null;
  deletedCard: Trip | null;
};
function tripReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_TRIP": {
      return {
        ...state,
        trip: [...state.trip, action.payload],
      };
    }
    case "ADD_EXPENSE": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id === action.payload.tripId) {
            return {
              ...trip,
              budget: trip.budget - action.payload.amount,
              expenses: [
                ...trip.expenses,
                {
                  id: Date.now(),
                  category: action.payload.category,
                  amount: action.payload.amount,
                  reason: action.payload.reason,
                  companion: action.payload.companion,
                },
              ],
            };
          }

          return trip;
        }),
      };
    }
    case "DELETE_CARD": {
      const deletedCard = state.trip.find((trip) => {
        return trip.id === action.payload;
      });

      return {
        ...state,
        trip: state.trip.filter((trip) => {
          return trip.id !== action.payload;
        }),
        deletedCard: deletedCard,
      };
    }
    case "DELETE_ITEM": {
      const tripToDelete = state.trip.find((trip) => {
        return trip.id === action.payload.tripId;
      });
      const deletedExpense = tripToDelete?.expenses.find((expense) => {
        return expense.id === action.payload.expenseId;
      });
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id === action.payload.tripId) {
            return {
              ...trip,
              budget: trip.budget + action.payload.amount,
              expenses: trip.expenses.filter((expense) => {
                return expense.id !== action.payload.expenseId;
              }),
            };
          }

          return trip;
        }),
        deletedExpense: {
          tripId: tripToDelete?.id,
          expense: deletedExpense,
        },
      };
    }
    case "EDIT_TRIP": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id === action.payload.tripId) {
            return {
              ...trip,
              // category: action.payload.category,
              country: action.payload.country,
              companion: action.payload.companion,
              budget: action.payload.budget,
            };
          }
          return trip;
        }),
      };
    }

    case "EDIT_ITEM": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id == action.payload.tripId) {
            return {
              ...trip,
              expenses: trip.expenses.map((expense) => {
                if (expense.id === action.payload.expenseId) {
                  return {
                    ...expense,
                    category: action.payload.category,
                    companion: action.payload.companion,
                    amount: action.payload.amount,
                    reason: action.payload.reason,
                  };
                }
                return expense;
              }),
            };
          }
          return trip;
        }),
      };
    }
    case "UNDO_ITEM": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id == state.deletedExpense?.tripId) {
            return {
              ...trip,
              budget: trip.budget - state.deletedExpense.expense.amount,
              expenses: [...trip.expenses, state.deletedExpense.expense],
            };
          }
          return trip;
        }),
        deletedExpense: null,
      };
    }
    case "UNDO_CARD": {
      return {
        ...state,
        trip: [...state.trip, state.deletedCard],
        deletedCard: null,
      };
    }
    default:
      return state;
  }
}
export { initialState, tripReducer };
