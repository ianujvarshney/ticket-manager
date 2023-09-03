import { ReactNode, createContext, useEffect, useReducer, useRef } from "react";
import { TicketProps } from "../../components/TicketList";
import { reducers } from "./reducers";
import { TicketActionProps, buildActions } from "./actions-builder";

type TicketContextProps = {
  state: StateProps;
  actions: TicketActionProps;
};

type TicketProviderProps = {
  children: ReactNode;
};

export type FilterProps = {
  type: "all" | "paid" | "unpaid";
  recipient: string;
  document_number?: string;
  is_online?: boolean;
};

export type StateProps = typeof globalState;

export const globalState = {
  isLoading: false,
  tickets: [] as TicketProps[],
  filter: {
    recipient: "",
    type: "all",
  } as FilterProps,
  page: 1,
  totalPages: 1,
};

export const TicketContext = createContext({} as TicketContextProps);

export function TicketProvider({ children }: TicketProviderProps) {
  const [state, dispatch] = useReducer(reducers, globalState);
  const actions = useRef(buildActions(dispatch));

  useEffect(() => {
    actions.current.setTickets(state.page);
    actions.current.setTotalPages();
  }, [state.page]);

  return (
    <TicketContext.Provider value={{ state, actions: actions.current }}>
      {children}
    </TicketContext.Provider>
  );
}
