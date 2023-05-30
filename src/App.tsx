import { Menu } from "./components/Menu";
import { TicketList } from "./components/TicketList";
import { TicketProvider } from "./contexts/TicketContext";

function App() {
  return (
    <div>
      <main className="pt-4 px-4">
        <TicketProvider>
          <Menu />
          <TicketList />
        </TicketProvider>
      </main>
    </div>
  );
}

export default App;
