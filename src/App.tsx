import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { List } from "./pages/list";
import { Login } from "./pages/login";
import { ProtectedLayout } from "./components/protectedLayout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedLayout children={<Home />} />,
      },
      {
        path: "/list",
        element: <ProtectedLayout children={<List />} />,
      },
    ],
  },
]);

export { router };
