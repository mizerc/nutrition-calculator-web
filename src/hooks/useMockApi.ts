// IndexedDB
// const request = indexedDB.open("MyDB", 1); // name + version

import type { Food } from "@/modules/foods/types/Food";
import type { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const FOODS_TABLE = "tableFoods3293029";

const loadFoods = (): Food[] => {
  const stored = localStorage.getItem(FOODS_TABLE);
  if (stored) return JSON.parse(stored);
  return [];
};

const saveFoods = (foods: Array<Food>) => {
  localStorage.setItem(FOODS_TABLE, JSON.stringify(foods));
};

export const enableMock = (api: AxiosInstance) => {
  const mock = new AxiosMockAdapter(api, { delayResponse: 200 });

  // Mock foods
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
    if(q === "") return [200, []];
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

  // Default
  mock.onAny().reply(404, { message: "Not Found" });
};
