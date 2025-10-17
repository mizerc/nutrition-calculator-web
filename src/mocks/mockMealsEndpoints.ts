import { AppDb } from "@/modules/browsersql";
import {
  MealCreateSchema,
  toMealGetDTO,
  type MealGetDTO,
} from "@/modules/meals/types/Meal";
import AxiosMockAdapter from "axios-mock-adapter";

export function mockMealsEndpointsWithBrowserSql(mock: AxiosMockAdapter) {
  mock.onGet("/meals").reply(async () => {
    const meals = await AppDb.meals.toArray();
    const mealDTOs = await Promise.all(meals.map(toMealGetDTO));
    console.log("GET /meals", mealDTOs.length);
    return [200, mealDTOs];
  });

  mock.onGet(/\/meals\/\d+/).reply(async (config) => {
    const id = parseInt(config.url!.split("/").pop()!, 10);
    const meal = await AppDb.meals.get(id);
    if (!meal) {
      return [404, { message: `Meal.id ${id} not found.` }];
    }
    const mealDTO = await toMealGetDTO(meal);
    return [200, mealDTO];
  });

  mock.onPost("/meals").reply(async (config) => {
    console.log("+++ MOCK_ON_POST /meals +++");

    try {
      const rawNemMealData = JSON.parse(config.data);
      console.log("rawNemMealData", rawNemMealData);

      const validNewMeal = MealCreateSchema.parse(rawNemMealData);
      console.log("validNewMeal", validNewMeal);

      // Validate basic fields
      // if (!name || !Array.isArray(foods)) {
      //   console.log("error 1");
      //   return [400, { message: "Invalid payload: name and foods[] required" }];
      // }

      const now = Date.now();
      let mealId: number;
      let totalKcal = 0;
      await AppDb.transaction(
        "rw",
        AppDb.meals,
        AppDb.mealFoods,
        AppDb.foods,
        async () => {
          const foodIds = validNewMeal.foods.map((f) => f.food.id!);
          const dbFoods = await AppDb.foods.bulkGet(foodIds);
          totalKcal = validNewMeal.foods.reduce((sum, f) => {
            const dbFood = dbFoods.find((x) => x?.id === f.food.id);
            if (!dbFood) return sum;
            const kcalForFood =
              (dbFood.kcal * f.weightGrams) / dbFood.portion_g;
            return sum + kcalForFood;
          }, 0);

          mealId = await AppDb.meals.add({
            name: validNewMeal.name,
            total_kcal: totalKcal,
            created_at: now,
            updated_at: now,
          });

          const mealFoodRecords = validNewMeal.foods.map((newFood) => ({
            meal_id: mealId!,
            food_id: newFood.food.id!,
            weight_g: newFood.weightGrams,
          }));

          console.log("mealFoodRecords", mealFoodRecords);

          await AppDb.mealFoods.bulkAdd(mealFoodRecords);
        }
      );

      const mealRow = await AppDb.meals.get(mealId!);
      const mealGetDTO: MealGetDTO = await toMealGetDTO(mealRow!);
      return [201, mealGetDTO];
    } catch (e: any) {
      console.error("POST /meals error:", e);
      if (e.name === "ZodError")
        return [400, { message: "Invalid meal payload", errors: e.errors }];

      return [500, { message: e.message }];
    }
  });
}
