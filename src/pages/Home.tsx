import { useEffect } from "react";
import { Menu } from "../components/Menu";
import { TicketList } from "../components/TicketList";
import { TicketProvider } from "../contexts/TicketContext";

export function Home() {
  useEffect(() => {
    localStorage.getItem("@ticket-manage/is_logged_in");
  }, []);

  return (
    <TicketProvider>
      <div className="p-4">
        <Menu />
        <TicketList />
      </div>
    </TicketProvider>
  );
}
