import { actions } from "./actions";

export type UserProps = {
  email: string;
  name: string;
  avatarUrl: string;
};

export const buildActions = (dispatch: any) => {
  return {
    signIn: async () => {
      const dbUser = await handleSignIn();
      dispatch({ type: actions.SIGN_IN, payload: dbUser });
    },

    signOut: () => {
      localStorage.removeItem("@ticket_manager_user");
      dispatch({ type: actions.SIGN_OUT });
    },
  };
};

async function handleSignIn() {
  const dbUser = await (window as any).user.signIn();
  localStorage.setItem("@ticket_manager_user", JSON.stringify(dbUser));
  return dbUser;
}
