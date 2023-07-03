import jwtDecode from "jwt-decode";

export type GoogleResponseProps = {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
};

export const buildActions = (dispatch: any) => {
  return {
    signIn: () => {
      handleGoogleSignIn();
    },

    setUser: () => {},
  };
};

function handleCallbackResponse(response: GoogleResponseProps) {
  const token = response.credential;
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
}

function handleGoogleSignIn() {
  /* global google */
  (window as any).google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_ID_CLIENT,
    callback: handleCallbackResponse,
  });

  (window as any).google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "outline", size: "large" }
  );
}
