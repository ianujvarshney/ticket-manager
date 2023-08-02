import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  //@ts-ignore
  if (context === "undefined") {
    throw new Error(
      "You have to use useUserContext inside <UserContextProvider />"
    );
  }

  return context;
};
