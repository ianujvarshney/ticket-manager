import { StateProps } from ".";
import { actions } from "./actions";

export const reducers = (state: StateProps, action: any) => {
  switch (action.type) {
    case actions.SET_FILTER: {
      return {
        ...state,
        tickets: action.payload.tickets,
        filters: action.payload.filters,
      };
    }

    case actions.SET_TICKETS: {
      return { ...state, tickets: action.payload };
    }
  }

  return { ...state };
};
