import { mockFoodsEndpointsWithBrowserSql } from "@/mocks/mockFoodsEndpoints";
import { mockMealsEndpointsWithBrowserSql } from "@/mocks/mockMealsEndpoints";
import type { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

// function mockFood(mock: AxiosMockAdapter) {
//   const FOODS_TABLE = "tableFoods3293029";

//   const loadFoods = (): Food[] => {
//     const stored = localStorage.getItem(FOODS_TABLE);
//     if (stored) return JSON.parse(stored);
//     return [];
//   };

//   const saveFoods = (foods: Array<Food>) => {
//     localStorage.setItem(FOODS_TABLE, JSON.stringify(foods));
//   };

//   // mock.onGet("/foods").reply(200, () => {
//   //   let foods: Array<Food> = loadFoods();
//   //   return foods;
//   // });
//   mock.onGet("/foods").reply(async () => {
//     // Retrieve all foods from IndexedDB using Dexie
//     const foods: FoodTable[] = await AppDb.foods.toArray();

//     // Return standard AxiosMockAdapter format [status, data]
//     return [200, foods.map((item) => toFoodDTO(item))];
//   });

//   mock.onPatch(/\/foods\/\d+/).reply((config) => {
//     console.log("+++ MOCK_ON_PATCH +++");
//     let foods = loadFoods();
//     const id = parseInt(config.url!.split("/").pop()!, 10);
//     const updates: Partial<Food> = JSON.parse(config.data ?? "{}");
//     const index = foods.findIndex((f) => f.id === id);
//     console.log("updates", updates);

//     if (index === -1) {
//       return [404, { message: "Food not found" }];
//     }

//     const updatedFood: Food = { ...foods[index], ...updates };
//     foods[index] = updatedFood;
//     saveFoods(foods);

//     return [200, updatedFood];
//   });

//   mock.onGet(/\/foods\/\d+/).reply((config) => {
//     let foods: Array<Food> = loadFoods();
//     const id = parseInt(config.url!.split("/").pop()!, 10);
//     const food = foods.find((f) => f.id === id);
//     return food ? [200, food] : [404, { message: "Food not found" }];
//   });

//   mock.onGet("/foods/search").reply((config) => {
//     const allFoods: Array<Food> = loadFoods();
//     const q = config.params?.q?.toString().toLowerCase() ?? "";
//     console.log("configggg", Object.keys(config.params));
//     console.log("configggg.q", config.params.q); // undefined
//     console.log("Q", q);
//     if (q === "") return [200, []];
//     const filtered = allFoods.filter((f) => f.name.toLowerCase().includes(q));
//     console.log("A", filtered);
//     return [200, filtered];
//   });

//   mock.onPost("/foods").reply(async (config) => {
//     // NEW
//     const newFood: Food = JSON.parse(config.data);
//     const id = await AppDb.foods.add({
//       name: newFood.name,
//       kcal: newFood.kcal,
//       portion_g: newFood.portionGrams,
//     });
//     newFood.id = id;

//     // OLD
//     // let foods: Array<Food> = loadFoods();
//     // const newFood: Food = JSON.parse(config.data);
//     // newFood.id = foods.length + 1;
//     // foods.push(newFood);
//     // saveFoods(foods);

//     return [201, newFood];
//   });
// }

// function mockMeals(mock: AxiosMockAdapter) {
//   const MEALS_TABLE = "meals_tb492932482384";
//   const loadMeals = (): Meal[] => {
//     const stored = localStorage.getItem(MEALS_TABLE);
//     if (stored) return JSON.parse(stored);
//     return [];
//   };

//   const saveMeals = (meals: Array<Meal>) => {
//     localStorage.setItem(MEALS_TABLE, JSON.stringify(meals));
//   };

//   mock.onGet("/meals").reply(200, () => {
//     let meals: Array<Meal> = loadMeals();
//     console.log("GET MEALS:", meals);
//     return meals;
//   });

//   mock.onGet(/\/meals\/\d+/).reply((config) => {
//     let meals: Array<Meal> = loadMeals();
//     const id = parseInt(config.url!.split("/").pop()!, 10);
//     const meal = meals.find((f) => f.id === id);
//     return meal ? [200, meal] : [404, { message: `Meal.id ${id} not found.` }];
//   });

//   mock.onPost("/meals").reply((config) => {
//     const newMealData = config.data;
//     console.log("POST MEALS:", newMealData);

//     let mealEntity: Array<Meal> = loadMeals();
//     const newMealRow: Meal = JSON.parse(newMealData);
//     newMealRow.id = mealEntity.length + 1;
//     mealEntity.push(newMealRow);
//     saveMeals(mealEntity);

//     return [201, newMealRow];
//   });
// }

export const enableMock = (api: AxiosInstance) => {
  const mock = new AxiosMockAdapter(api, { delayResponse: 200 });

  // mockMeals(mock);
  mockMealsEndpointsWithBrowserSql(mock);

  // mockFood(mock);
  mockFoodsEndpointsWithBrowserSql(mock);

  // Default
  mock.onAny().reply(404, { message: "Not Found" });
};
