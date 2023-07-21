import { FilterProps } from ".";
import { TicketProps } from "../../components/TicketList";
import { actions } from "./actions";

export const buildActions = (dispatch: any) => {
  return {
    setFilter: async (payload: {
      recipient: string;
      type: "all" | "paid" | "unpaid";
      expiry_date?: Date;
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

async function getFilteredTickets(filter: FilterProps) {
  const resultObj = {} as FilterProps;

  for (let item in filter) {
    if (filter.hasOwnProperty(item) && item !== "type") {
      //@ts-ignore
      resultObj[item as keyof typeof resultObj] =
        filter[item as keyof typeof filter];
    }
  }

  if (filter.type === "all" && !Object.keys(resultObj).length) {
    return await (window as any).ticket.listTicket();
  }

  if (filter.type === "all" && Object.keys(resultObj).length) {
    return await (window as any).ticket.filterTicket({
      ...resultObj,
    });
  }

  console.log({
    is_paid: filter.type === "paid",
    ...resultObj,
  });

  return await (window as any).ticket.filterTicket({
    is_paid: filter.type === "paid",
    ...resultObj,
  });
}
