import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { useState } from "react";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const signInRoutes = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
]);

export function Routes() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div>
      <RouterProvider router={isSignedIn ? routes : signInRoutes} />
    </div>
  );
}
