import { ReactNode, createContext, useEffect, useState } from "react";
import { TicketProps } from "../components/TicketList";

type TicketContextProps = {
  isLoading: boolean;
  tickets: TicketProps[];
  filters?: {
    isPaid?: "all" | "paid" | "unpaid";
    maxDate?: Date;
    minDate?: Date;
    recipient?: string;
  };
};

type TicketProviderProps = {
  children: ReactNode;
};

export const TicketContext = createContext({} as TicketContextProps);

export function TicketProvider({ children }: TicketProviderProps) {
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getTickets() {
    setIsLoading(true);
    const dbTickets = await (window as any).ticket.listTicket();
    console.log(dbTickets);
    setTickets(dbTickets);
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, isLoading }}>
      {children}
    </TicketContext.Provider>
  );
}
