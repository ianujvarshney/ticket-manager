import { FilterProps, globalState } from ".";
import { TicketProps } from "../../components/TicketList";
import { actions } from "./actions";

export type TicketActionProps = ReturnType<typeof buildActions>;

export const buildActions = (dispatch: any) => {
  return {
    setFilter: async (payload: FilterProps, page = 1) => {
      const dbItems = await getFilteredTickets(payload, page);

      console.log(dbItems);

      dispatch({
        type: actions.SET_TOTAL_PAGE,
        payload: dbItems.pages,
      });

      dispatch({
        type: actions.SET_FILTER,
        payload: {
          filters: payload,
          tickets: dbItems.tickets,
        },
      });

      dispatch({
        type: actions.SET_PAGE,
        payload: page,
      });
    },

    clearFilter: () => {
      dispatch({ type: actions.CLEAR_FILTER, payload: globalState.filter });
    },

    // getTickets: () => {
    //   dispatch({ type: actions.GET_TICKETS });
    // },

    setTickets: async (page: number) => {
      const { tickets, pages } = await getDBTickets(page);

      dispatch({ type: actions.SET_TICKETS, payload: tickets });
      dispatch({ type: actions.SET_TOTAL_PAGE, payload: pages });
    },

    refreshTickets: async (page = 1) => {
      const { tickets, pages } = await (window as any).ticket.listTicket({
        page: page,
      });
      dispatch({ type: actions.SET_PAGE, payload: page });
      dispatch({ type: actions.REFRESH_TICKETS, payload: tickets });
      dispatch({ type: actions.SET_TOTAL_PAGE, payload: pages });
    },

    setPage: (page: number) => {
      dispatch({ type: actions.SET_PAGE, payload: page });
    },

    setTotalPages: async () => {
      const resp = await getTotalPages();
      const totalPages = Math.ceil(resp / 100);
      dispatch({ type: actions.SET_TOTAL_PAGE, payload: totalPages });
    },
  };
};

async function getTotalPages() {
  const total = await (window as any).ticket.getTotalTickets();
  return total;
}

async function getDBTickets(page: number, itemsPerPage?: number) {
  const resp = (await (window as any).ticket.listTicket({
    page,
    size: itemsPerPage || 100,
  })) as { tickets: TicketProps[]; pages: number };

  return resp;
}

async function getFilteredTickets(
  filter: FilterProps,
  page = 1,
  itemsPerPage = 100
) {
  const resultObj = {} as FilterProps;

  for (let item in filter) {
    const excludedItemTypes = ["type"];

    if (
      (filter[item as keyof typeof filter] &&
        !excludedItemTypes.includes(item)) ||
      item === "is_online"
    ) {
      //@ts-ignore
      resultObj[item as keyof typeof resultObj] =
        filter[item as keyof typeof filter];
    }
  }

  if (filter.type === "all" && !Object.keys(resultObj).length) {
    const res = await (window as any).ticket.listTicket({
      page,
      size: itemsPerPage,
    });

    return res;
  }

  if (filter.type === "all" && Object.keys(resultObj).length) {
    const res = await (window as any).ticket.filterTicket({
      size: itemsPerPage,
      ...resultObj,
    });

    return res;
  }

  const res = await (window as any).ticket.filterTicket({
    page,
    size: itemsPerPage,
    is_paid: filter.type === "paid",
    ...resultObj,
  });

  return res;
}
