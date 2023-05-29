import { Menu } from "./components/Menu";
import { TicketList } from "./components/TicketList";

function App() {
  return (
    <div>
      <main className="pt-4 px-4">
        <Menu />
        <TicketList />
      </main>
    </div>
  );
}

export default App;
