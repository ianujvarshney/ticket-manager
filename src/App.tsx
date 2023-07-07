import { UserContextProvider } from "./contexts/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes } from "./routes";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID_CLIENT}>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
