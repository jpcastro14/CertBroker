import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { List } from "./pages/list";
import { ProtectedLayout } from "./components/protectedLayout";
import { BrokerProfile } from "./pages/brokerProfile";
import { AdminPage } from "./pages/adminPage";
import { NewBroker } from "./pages/newBroker";

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
      {
        path: "/admin",
        element: <ProtectedLayout children={<AdminPage />} />,
      },
      {
        path: "/newBroker",
        element: <ProtectedLayout children={<NewBroker />} />,
      },
    ],
  },
]);

export { router };
