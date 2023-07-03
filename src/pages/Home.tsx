import { Menu } from "../components/Menu";
import { TicketList } from "../components/TicketList";
import { TicketProvider } from "../contexts/TicketContext";

export function Home() {
  return (
    <TicketProvider>
      <Menu />
      <TicketList />
    </TicketProvider>
  );
}
