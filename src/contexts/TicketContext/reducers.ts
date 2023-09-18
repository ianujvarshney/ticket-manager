import { StateProps } from ".";
import { actions } from "./actions";

export const reducers = (state: StateProps, action: any) => {
  switch (action.type) {
    case actions.SET_FILTER: {
      return {
        ...state,
        tickets: action.payload.tickets,
        filter: action.payload.filters,
      };
    }

    case actions.SET_TICKETS: {
      return { ...state, tickets: action.payload };
    }

    case actions.REFRESH_TICKETS: {
      return { ...state, tickets: action.payload };
    }

    case actions.SET_PAGE: {
      return { ...state, page: action.payload };
    }

    case actions.CLEAR_FILTER: {
      return { ...state, filter: action.payload };
    }

    case actions.SET_TOTAL_PAGE:
      {
        return { ...state, totalPages: action.payload };
      }

      return { ...state };
  }
};
