import { UserContextProvider } from "./contexts/UserContext";
import { Routes } from "./routes";

function App() {
  return (
    <UserContextProvider>
      {/* <main className="pt-4 px-4"> */}
      <Routes />
      {/* </main> */}
    </UserContextProvider>
  );
}

export default App;
