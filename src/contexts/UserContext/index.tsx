import { ReactNode, createContext, useEffect, useReducer, useRef } from "react";
import { buildActions } from "./actions-builder";
import { reducer } from "./reducers";

type UserProviderProps = {
  children: ReactNode;
};

export type StateProps = typeof globalState;

const globalState = {
  user: {
    name: "",
    avatarUrl: "",
  },
};

export const UserContext = createContext({});

export function UserContextProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(reducer, globalState);

  const action = useRef(buildActions(dispatch));

  useEffect(() => {
    action.current.signIn();
  }, []);

  return (
    <UserContext.Provider value={{ state, action: action.current }}>
      {children}
    </UserContext.Provider>
  );
}
