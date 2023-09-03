import { useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (typeof context === "undefined") {
    throw new Error(
      "You have to use useTickets inside <TicketContextProvider />"
    );
  }

  return context;
};
