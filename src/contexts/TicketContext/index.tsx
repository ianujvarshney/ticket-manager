import { ReactNode, createContext, useEffect, useReducer, useRef } from "react";
import { TicketProps } from "../../components/TicketList";
import { reducers } from "./reducers";
import { buildActions } from "./actions-builder";

type NewType = {
  state: StateProps;
  actions: {
    setFilter: (payload: {
      recipient: string;
      type: "all" | "paid" | "unpaid";
      expiry_date?: Date;
    }) => void;
    getTickets: () => void;
  };
};

type TicketContextProps = NewType;

type TicketProviderProps = {
  children: ReactNode;
};

type FilterPaidProps = "all" | "paid" | "unpaid";
export type FilterProps = {
  type: FilterPaidProps;
  recipient: string;
};

export type StateProps = typeof globalState;

const globalState = {
  isLoading: false,
  tickets: [] as TicketProps[],
  filter: {
    recipient: "",
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
