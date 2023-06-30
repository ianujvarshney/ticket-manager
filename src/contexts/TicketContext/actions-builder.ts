import { TicketProps } from "../../components/TicketList";
import { actions } from "./actions";

export const buildActions = (dispatch: any) => {
  return {
    setFilter: async (payload: {
      name: string;
      type: "all" | "paid" | "unpaid";
    }) => {
      const dbItems = await getFilteredTickets(payload);

      dispatch({
        type: actions.SET_FILTER,
        payload: {
          filters: payload,
          tickets: dbItems,
        },
      });
    },

    getTickets: () => {
      dispatch({ type: actions.GET_TICKETS });
    },

    setTickets: async () => {
      const db = await getDBTickets();
      dispatch({ type: actions.SET_TICKETS, payload: db });
    },
  };
};

async function getDBTickets() {
  const resp = (await (window as any).ticket.listTicket()) as TicketProps[];
  return resp;
}

async function getFilteredTickets(filter: {
  name: string;
  type: "all" | "paid" | "unpaid";
}) {
  if (filter.type === "all" && !filter.name) {
    return await (window as any).ticket.listTicket();
  }

  if (filter.type === "all" && filter.name) {
    return await (window as any).ticket.filterTicket({
      recipient: filter.name,
    });
  }

  if (!filter.name) {
    return await (window as any).ticket.filterTicket({
      is_paid: filter.type === "paid",
    });
  }

  return await (window as any).ticket.filterTicket({
    is_paid: filter.type === "paid",
    recipient: filter.name,
  });
}
