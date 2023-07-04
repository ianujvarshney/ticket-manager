import { StateProps, globalState } from ".";
import { actions } from "./actions";

export const reducer = (state: StateProps, action: any) => {
  switch (action.type) {
    case actions.SIGN_IN: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case actions.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case actions.SIGN_OUT: {
      return {
        ...state,
        user: globalState.user,
      };
    }

    default: {
      console.log(action.type);
      return { ...state };
    }
  }
};
