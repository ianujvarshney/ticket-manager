import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useUserContext } from "../hooks/UserContext";

export type GoogleUserProps = {
  email: string;
  name: string;
  picture: string;
};

export function SignIn() {
  const { action } = useUserContext();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center rounded-md bg-zinc-400 p-10">
        <h1 className="mb-4 text-lg font-bold text-white">Fazer Login</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decodedCredentials = jwtDecode(
              JSON.stringify(credentialResponse)
            ) as GoogleUserProps;

            const { email, name, picture } = decodedCredentials;

            const user = {
              email,
              name,
              avatarUrl: picture,
            };

            action.signIn(user);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </div>
    </div>
  );
}
