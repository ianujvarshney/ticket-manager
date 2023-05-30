import { useContext } from "react";
import { TicketContext } from "../contexts/TicketContext";

export const useTickets = () => useContext(TicketContext);
