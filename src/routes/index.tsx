import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { useUserContext } from "../hooks/UserContext";
import { DefaultPass } from "../pages/DefaultPass";
import { ChangePass } from "../pages/ChangePass";
import { ReturnToApp } from "../pages/ReturnToApp";

export const routes = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/change-pass",
    element: <ChangePass />,
  },
]);

const signInRoutes = createHashRouter([
  {
    path: "/",
    element: <DefaultPass />,
  },

  {
    path: "/sign-in",
    element: <SignIn />,
  },

  {
    path: "/return-to-app",
    element: <ReturnToApp />,
  },
]);

export function Routes() {
  const { state } = useUserContext();

  return (
    <div>
      <RouterProvider router={state?.user?.email ? routes : signInRoutes} />
    </div>
  );
}
