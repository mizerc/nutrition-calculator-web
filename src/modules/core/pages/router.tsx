import ErrorPage from "@/modules/core/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../componets/AppLayout";
import Dashboard from "@/modules/dashboard";
import FoodDashboard from "@/modules/foods/pages/FoodDashboard";
import FoodView from "@/modules/foods/pages/FoodView";
import FoodList from "@/modules/foods/pages/FoodList";
import FoodCreate from "@/modules/foods/pages/FoodCreate";
import MealList from "@/modules/meals/pages/MealList";
import MealView from "@/modules/meals/pages/MealView";
import MealCreate from "@/modules/meals/pages/MealCreate";
import Debug from "@/modules/debug";

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

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />, // persistent layout (with sidebar, outlet, etc.)
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Dashboard /> },
        // Foods
        { path: "foods", element: <FoodDashboard /> },
        { path: "foods/view/:id", element: <FoodView /> },
        { path: "foods/list", element: <FoodList /> },
        { path: "foods/create", element: <FoodCreate /> },
        // Meals
        { path: "meals", element: <MealList /> },
        { path: "meals/view/:id", element: <MealView /> },
        { path: "meals/list", element: <MealList /> },
        { path: "meals/create", element: <MealCreate /> },
        // Debug
        { path: "debug", element: <Debug /> },
      ],
    },
  ],
  {
    basename: "/nutrition-calculator-web/",
  }
);

export default router;
