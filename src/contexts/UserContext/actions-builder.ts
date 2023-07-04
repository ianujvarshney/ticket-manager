import jwtDecode from "jwt-decode";
import { actions } from "./actions";

export type GoogleResponseProps = {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
};

type GoogleUserProps = {
  email: string;
  name: string;
  picture: string;
};

export type UserProps = {
  email: string;
  name: string;
  avatarUrl: string;
};

let user: UserProps;

export const buildActions = (dispatch: any) => {
  return {
    signIn: () => {
      handleGoogleSignIn(() => {
        dispatch({ type: actions.SIGN_IN, payload: user });
      });
    },
  };
};

function handleCallbackResponse(
  response: GoogleResponseProps,
  callback: () => void
) {
  const token = response.credential;
  const decodedToken = jwtDecode(token);
  const { email, name, picture } = decodedToken as GoogleUserProps;
  user = {
    email,
    name,
    avatarUrl: picture,
  };

  localStorage.setItem("@ticket_manager_user", JSON.stringify(user));

  callback();
}

async function handleGoogleSignIn(cb: () => void) {
  /* global google */
  await (window as any).google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_ID_CLIENT,
    callback: (response: any) => handleCallbackResponse(response, cb),
  });

  (window as any).google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {
      theme: "outline",
      size: "large",
    }
  );
}
