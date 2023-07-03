import { StateProps } from ".";
import { actions } from "./actions";

export const reducer = (state: StateProps, action: any) => {
  switch (action.type) {
    case actions.SIGN_IN: {
      return {
        ...state,
      };
    }

    default: {
      return { ...state };
    }
  }
};
