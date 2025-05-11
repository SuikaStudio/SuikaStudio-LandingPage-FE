import Home from "@/pages/home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const Routes = () => {
  // For Public Routes
  const routesForPublic = [{ path: "/", element: <Home /> }];

  // For Authenticated Routes
  // const routesForAuthenticatedOnly = [];

  // For Not Authenticated Routes
  // const routesForNotAuthenticatedOnly = [];

  // Router COnfig
  const routerConfig = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: routesForPublic,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={routerConfig} />;
};

export default Routes;
