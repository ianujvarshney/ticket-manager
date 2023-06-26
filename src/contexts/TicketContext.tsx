import { ReactNode, createContext, useEffect, useState } from "react";
import { TicketProps } from "../components/TicketList";

type TicketContextProps = {
  isLoading: boolean;
  tickets: TicketProps[];
  handleChangeShowingType: (type: "all" | "paid" | "unpaid") => void;
  filterShowingType: "all" | "paid" | "unpaid";
  handleSearchByBeneficent: (name: string) => void;
  filterBeneficent: string;
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
  const [filterBeneficent, setFilterBeneficent] = useState("");

  useEffect(() => {
    filter();
  }, [filterShowingType, filterBeneficent]);

  async function getTickets() {
    setIsLoading(true);
    const dbTickets = await (window as any).ticket.listTicket();
    console.log(dbTickets);
    setTickets(dbTickets);
  }

  async function handleSearchByBeneficent(name: string) {
    resetFilters();
    setFilterBeneficent(() => name);
  }

  async function handleChangeShowingType(type: "all" | "paid" | "unpaid") {
    setFilterShowingType(() => type);
  }

  async function filter() {
    if (filterShowingType === "all" && !filterBeneficent) {
      const dbTickets = await (window as any).ticket.listTicket();
      setTickets(dbTickets);
      return;
    }

    if (filterShowingType === "all") {
      const dbTickets = await (window as any).ticket.filterTicket({
        recipient: filterBeneficent,
      });

      setTickets(dbTickets);

      return dbTickets;
    }

    const dbTickets = await (window as any).ticket.filterTicket({
      is_paid: filterShowingType === "paid",
      recipient: filterBeneficent,
    });

    setTickets(dbTickets);
  }

  function resetFilters() {
    setFilterShowingType("all");
    setFilterBeneficent("");
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        isLoading,
        handleChangeShowingType,
        filterShowingType,
        handleSearchByBeneficent,
        filterBeneficent,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
