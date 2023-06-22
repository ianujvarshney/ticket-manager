import { ReactNode, createContext, useEffect, useState } from "react";
import { TicketProps } from "../components/TicketList";

type TicketContextProps = {
  isLoading: boolean;
  tickets: TicketProps[];
  handleChangeShowingType: (type: "all" | "paid" | "unpaid") => void;
  filterShowingType: "all" | "paid" | "unpaid";
};

type TicketProviderProps = {
  children: ReactNode;
};

export const TicketContext = createContext({} as TicketContextProps);

export function TicketProvider({ children }: TicketProviderProps) {
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterShowingType, setFilterShowingType] = useState<
    "all" | "paid" | "unpaid"
  >("all");

  async function getTickets() {
    setIsLoading(true);
    const dbTickets = await (window as any).ticket.listTicket();
    console.log(dbTickets);
    setTickets(dbTickets);
  }

  async function handleChangeShowingType(type: "all" | "paid" | "unpaid") {
    setFilterShowingType(type);

    if (type === "all") {
      const dbTickets = await (window as any).ticket.listTicket();
      setTickets(dbTickets);
      return;
    }

    const dbTickets = await (window as any).ticket.filterTicket({
      showingType: type,
    });

    setTickets(dbTickets);
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <TicketContext.Provider
      value={{ tickets, isLoading, handleChangeShowingType, filterShowingType }}
    >
      {children}
    </TicketContext.Provider>
  );
}
