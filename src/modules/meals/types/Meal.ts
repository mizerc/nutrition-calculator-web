import { AppDb } from "@/modules/browsersql";
import { FoodDtoSchema, type FoodTable } from "@/modules/foods/types/Food";
import { z } from "zod";

//  ========================================================
//  DATABASE ENTITY SCHEMA MODELING
//  ========================================================

export interface MealTable {
  id?: number;
  name: string;
  total_kcal: number;
  created_at: number;
  updated_at: number;
}

// Joint table
export interface MealFoodTable {
  id?: number;
  meal_id: number;
  food_id: number;
  weight_g: number;
}

//  ========================================================
//  UTILITIES
//  ========================================================

// From meal table to meal dto
export async function toMealGetDTO(meal: MealTable): Promise<MealGetDTO> {
  const mealFoods: MealFoodTable[] = await AppDb.mealFoods
    .where("meal_id")
    .equals(meal.id!)
    .toArray();

  const allFoodIds = mealFoods.map((mf) => mf.food_id);

  const foodRecords: (FoodTable | undefined)[] = await AppDb.foods.bulkGet(
    allFoodIds
  );

  // 3️⃣ Build the foods DTO array
  const foodsDTO: MealFoodItemDTO[] = mealFoods.map((mf) => {
    const dbFood = foodRecords.find((f) => f?.id === mf.food_id);
    if (!dbFood || !dbFood.id) {
      throw new Error(`Food.id ${mf.food_id} not found for Meal.id ${meal.id}`);
    }

    // Calculate kcalTotal for this food entry
    // const kcalTotal = (dbFood.kcal * mf.weight_g) / dbFood.portion_g;

    return {
      food: {
        id: dbFood.id,
        kcal: dbFood.kcal,
        name: dbFood.name,
        portionGrams: dbFood.portion_g,
      },
      weightGrams: mf.weight_g,
    };
  });

  return {
    id: meal.id!,
    name: meal.name,
    totalKcal: meal.total_kcal,
    createdAt: meal.created_at ?? Date.now(),
    updatedAt: meal.updated_at ?? Date.now(),
    foods: foodsDTO,
  };
}

//  ========================================================
//  API CONTRACT/DTO
//  ========================================================

// MEAL CREATE DTO (client input)
export const MealCreateFoodItemSchema = z.object({
  weightGrams: z.number().positive(),
  food: FoodDtoSchema, // nested validation of FoodDTO
});
export const MealCreateSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  foods: z.array(MealCreateFoodItemSchema).nonempty(), // require at least 1 food
});
export type MealCreateDTO = z.infer<typeof MealCreateSchema>;
export type MealFoodItemDTO = z.infer<typeof MealCreateFoodItemSchema>;

// MEAL GET DTO (api output)
export const MealGetSchema = MealCreateSchema.extend({
  totalKcal: z.number(),
});
export type MealGetDTO = z.infer<typeof MealGetSchema>;
