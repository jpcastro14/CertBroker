import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { List } from "./pages/list";
import { ProtectedLayout } from "./components/protectedLayout";
import { BrokerProfile } from "./pages/brokerProfile";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedLayout children={<List />} />,
      },
      {
        path: "/brokerProfile/:id",
        element: <ProtectedLayout children={<BrokerProfile />} />,
      },
    ],
  },
]);

export { router };
