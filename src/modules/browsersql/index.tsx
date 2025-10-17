import Dexie, { type Table } from "dexie";
import type { FoodTable } from "../foods/types/Food";
import type { MealFoodTable, MealTable } from "../meals/types/Meal";

export class AppDatabase extends Dexie {
  foods!: Table<FoodTable, number>; // Table<Food, PrimaryKeyType>
  meals!: Table<MealTable, number>;
  mealFoods!: Table<MealFoodTable, number>;

  constructor() {
    super("AppDatabase");

    // Define schema for version 1
    this.version(4).stores({
      foods: "++id, name, portion_g, kcal, created_at, updated_at",
      meals: "++id, name, created_at, updated_at, total_kcal",
      // join table
      mealFoods: "++id, meal_id, food_id, weight_g",
    });
  }
}

export const AppDb = new AppDatabase();
