import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Foods from "./routes/Foods";
import Layout from "./routes/Layout";
import ErrorPage from "./routes/ErrorPage";
import ListPage from "./routes/ListPage";

const router = createBrowserRouter([
  {
    element: <Layout />, // persistent layout (with sidebar, outlet, etc.)
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "foods", element: <Foods /> },
      { path: "meals", element: <ListPage /> },
    ],
  },
]);

export default router;
