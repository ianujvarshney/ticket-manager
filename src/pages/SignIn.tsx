import { useUserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogo } from "phosphor-react";

export type GoogleUserProps = {
  email: string;
  name: string;
  picture: string;
};

export function SignIn() {
  const { action } = useUserContext();
  const navigate = useNavigate();

  function handleSignIn() {
    navigate("/");
    action.signIn();
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center rounded-md bg-zinc-400 p-10">
        <h1 className="mb-4 text-lg font-bold text-white">Fazer Login</h1>
        <button
          onClick={handleSignIn}
          className="
            flex h-[40px] min-w-[240px] max-w-[400px] items-center justify-center gap-2 
            rounded-md bg-white text-sm font-bold text-zinc-900
          "
        >
          <GoogleLogo weight="bold" size={24} />
          Fazer Login com Google
          <span></span>
        </button>
      </div>
    </div>
  );
}
