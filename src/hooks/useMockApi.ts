// IndexedDB
// const request = indexedDB.open("MyDB", 1); // name + version

import type { Food } from "@/modules/foods/types/Food";
import type { Meal } from "@/modules/meals/types/Meal";
import type { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

function mockFood(mock: AxiosMockAdapter) {
  const FOODS_TABLE = "tableFoods3293029";

  const loadFoods = (): Food[] => {
    const stored = localStorage.getItem(FOODS_TABLE);
    if (stored) return JSON.parse(stored);
    return [];
  };

  const saveFoods = (foods: Array<Food>) => {
    localStorage.setItem(FOODS_TABLE, JSON.stringify(foods));
  };

  mock.onGet("/foods").reply(200, () => {
    let foods: Array<Food> = loadFoods();
    return foods;
  });

  mock.onGet(/\/foods\/\d+/).reply((config) => {
    let foods: Array<Food> = loadFoods();
    const id = parseInt(config.url!.split("/").pop()!, 10);
    const food = foods.find((f) => f.id === id);
    return food ? [200, food] : [404, { message: "Food not found" }];
  });

  mock.onGet("/foods/search").reply((config) => {
    const allFoods: Array<Food> = loadFoods();
    const q = config.params?.q?.toString().toLowerCase() ?? "";
    console.log("configggg", Object.keys(config.params));
    console.log("configggg.q", config.params.q); // undefined
    console.log("Q", q);
    if (q === "") return [200, []];
    const filtered = allFoods.filter((f) => f.name.toLowerCase().includes(q));
    console.log("A", filtered);
    return [200, filtered];
  });

  mock.onPost("/foods").reply((config) => {
    let foods: Array<Food> = loadFoods();
    const newFood: Food = JSON.parse(config.data);
    newFood.id = foods.length + 1;
    foods.push(newFood);
    saveFoods(foods);
    return [201, newFood];
  });
}

interface MealsTable {
  id: number;
  name: string;
}
interface MealsFoodTable {
  id: number;
  food_id: string;
  meal_id: string;
}

export const enableMock = (api: AxiosInstance) => {
  const mock = new AxiosMockAdapter(api, { delayResponse: 200 });

  mockFood(mock);

  const MEALS_TABLE = "meals_tb492932482384";
  const loadMeals = (): Meal[] => {
    const stored = localStorage.getItem(MEALS_TABLE);
    if (stored) return JSON.parse(stored);
    return [];
  };

  const saveMeals = (meals: Array<Meal>) => {
    localStorage.setItem(MEALS_TABLE, JSON.stringify(meals));
  };

  mock.onGet("/meals").reply(200, () => {
    let meals: Array<Meal> = loadMeals();
    console.log("GET MEALS:", meals);
    return meals;
  });

  mock.onGet(/\/foods\/\d+/).reply((config) => {
    let meals: Array<Meal> = loadMeals();
    const id = parseInt(config.url!.split("/").pop()!, 10);
    const meal = meals.find((f) => f.id === id);
    return meal ? [200, meal] : [404, { message: "Meal not found" }];
  });

  mock.onPost("/meals").reply((config) => {
    const newMealData = config.data;
    console.log("POST MEALS:", newMealData);

    let mealEntity: Array<Meal> = loadMeals();
    const newMealRow: Meal = JSON.parse(newMealData);
    newMealRow.id = mealEntity.length + 1;
    mealEntity.push(newMealRow);
    saveMeals(mealEntity);

    return [201, newMealRow];
  });

  // Default
  mock.onAny().reply(404, { message: "Not Found" });
};
