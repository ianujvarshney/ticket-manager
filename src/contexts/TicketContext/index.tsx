import { ReactNode, createContext, useEffect, useReducer, useRef } from "react";
import { TicketProps } from "../../components/TicketList";
import { reducers } from "./reducers";
import { buildActions } from "./actions-builder";

type NewType = {
  state: StateProps;
  actions: {
    setFilter: (payload: {
      name: string;
      type: "all" | "paid" | "unpaid";
    }) => void;
    getTickets: () => void;
  };
};

type TicketContextProps = NewType;

type TicketProviderProps = {
  children: ReactNode;
};

type FilterPaidProps = "all" | "paid" | "unpaid";
type FilterProps = {
  type: FilterPaidProps;
  name: string;
};

export type StateProps = typeof globalState;

const globalState = {
  isLoading: false,
  tickets: [] as TicketProps[],
  filter: {
    name: "",
    type: "all",
  } as FilterProps,
};

export const TicketContext = createContext({} as TicketContextProps);

export function TicketProvider({ children }: TicketProviderProps) {
  const [state, dispatch] = useReducer(reducers, globalState);
  const actions = useRef(buildActions(dispatch));

  useEffect(() => {
    actions.current.setTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ state, actions: actions.current }}>
      {children}
    </TicketContext.Provider>
  );
}
