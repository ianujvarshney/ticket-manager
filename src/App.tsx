import { UserContextProvider } from "./contexts/UserContext";
import { Routes } from "./routes";

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
