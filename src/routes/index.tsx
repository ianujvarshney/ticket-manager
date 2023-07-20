import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { useUserContext } from "../hooks/UserContext";
import { DefaultPass } from "../pages/DefaultPass";

export const routes = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <DefaultPass />,
  },
]);

const signInRoutes = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
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
