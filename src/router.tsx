import { createBrowserRouter } from "react-router-dom";
import Layout from "./routes/Layout";
import ErrorPage from "./routes/ErrorPage";
import AddFoodForm from "./modules/foods/pages/FoodCreate";
import FoodList from "./modules/foods/pages/FoodList";
import FoodDashboard from "./modules/foods/pages/FoodDashboard";
import FoodView from "./modules/foods/pages/FoodView";
import MealCreate from "./modules/meals/pages/MealCreate";
import Dashboard from "./modules/dashboard";
import MealList from "./modules/meals/pages/MealList";

export const PAGES = {
  food: {
    create: "/foods/create",
    list: "/foods/list",
  },
  meal: {
    create: "/meals/create",
    list: "/meals/list",
  },
};

const router = createBrowserRouter([
  {
    element: <Layout />, // persistent layout (with sidebar, outlet, etc.)
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      // Foods
      { path: "foods", element: <FoodDashboard /> },
      { path: "foods/view/:id", element: <FoodView /> },
      { path: "foods/list", element: <FoodList /> },
      { path: "foods/create", element: <AddFoodForm /> },
      // Meals
      { path: "meals", element: <MealList /> },
      { path: "meals/list", element: <MealList /> },
      { path: "meals/create", element: <MealCreate /> },
    ],
  },
]);

export default router;
