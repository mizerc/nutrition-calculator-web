import { AppDb } from "@/modules/browsersql";
import {
  toFoodDTO,
  toFoodTable,
  type FoodDTO,
  type FoodTable,
} from "@/modules/foods/types/Food";
import AxiosMockAdapter from "axios-mock-adapter";

export function mockFoodsEndpointsWithBrowserSql(mock: AxiosMockAdapter) {
  //  GET /foods
  mock.onGet("/foods").reply(async () => {
    const foods: FoodTable[] = await AppDb.foods.toArray();
    return [200, foods.map((item) => toFoodDTO(item))];
  });

  //  GET /foods/search?q
  mock.onGet("/foods/search").reply(async (config) => {
    // const url = new URL(config.url!, "http://localhost"); // base required
    // const q = url.searchParams.get("q")?.trim().toLowerCase() ?? "";
    const q = config.params?.q?.toString().toLowerCase() ?? "";

    console.log("GET FOODS/SEARCH?Q=", q);

    if (!q || q.length < 2) {
      // RETURN ALL
      // const allFoods = await AppDb.foods.toArray();
      // return [200, allFoods];
      return [404, []];
    }

    const foodRecords: FoodTable[] = await AppDb.foods
      .filter((f) => f.name.toLowerCase().includes(q))
      .toArray();

    const foodsDTO = foodRecords.map((foodRecord: FoodTable) => {
      return toFoodDTO(foodRecord);
    });

    return [200, foodsDTO];
  });

  // GET /foods/:id
  mock.onGet(/\/foods\/\d+/).reply(async (config) => {
    // Extract ID from URL
    const id = parseInt(config.url!.split("/").pop()!, 10);

    // Query Dexie by primary key
    const record: FoodTable | undefined = await AppDb.foods.get(id);
    if (record) {
      const food: FoodDTO = toFoodDTO(record);
      return [200, food];
    } else {
      return [404, { message: "Food not found" }];
    }
  });

  // PATCH /foods/:id
  mock.onPatch(/\/foods\/\d+/).reply(async (config) => {
    console.log("+++ MOCK_ON_PATCH +++");
    const id = parseInt(config.url!.split("/").pop()!, 10);

    const updates: Partial<FoodDTO> = JSON.parse(config.data ?? "{}");

    const existingRecord: FoodTable | undefined = await AppDb.foods.get(id);
    if (!existingRecord) {
      return [404, { message: "Food not found" }];
    }

    const now = Date.now();
    const updatedRecord: FoodTable = {
      ...existingRecord,
      ...toFoodTable({ ...toFoodDTO(existingRecord), ...updates }), // keep field mapping consistent
      updated_at: now,
    };

    await AppDb.foods.put(updatedRecord);

    const updatedFood: FoodDTO = toFoodDTO(updatedRecord);
    return [200, updatedFood];
  });

  // POST /foods
  mock.onPost("/foods").reply(async (config) => {
    const newFood: FoodDTO = JSON.parse(config.data);
    const now = Date.now();
    const id = await AppDb.foods.add({
      name: newFood.name,
      kcal: newFood.kcal,
      portion_g: newFood.portionGrams,
      created_at: now,
      updated_at: now,
    });

    newFood.id = id;

    return [201, newFood];
  });
}
