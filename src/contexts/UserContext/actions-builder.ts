import { actions } from "./actions";

export type UserProps = {
  email: string;
  name: string;
  avatarUrl: string;
};

export const buildActions = (dispatch: any) => {
  return {
    signIn: (user: UserProps) => {
      handleSignIn(user);
      // dispatch({ type: actions.SIGN_IN, payload: user });
    },

    signOut: () => {
      localStorage.removeItem("@ticket_manager_user");
      dispatch({ type: actions.SIGN_OUT });
    },
  };
};

async function handleSignIn(user: UserProps) {
  console.log(user);
  const dbUser = await (window as any).user.signIn(user);
  console.log("DB_USER", dbUser);
}
