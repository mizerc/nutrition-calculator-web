import { z } from "zod";

//  ========================================================
//  DATABASE ENTITY SCHEMA MODELING
//  ========================================================

export interface FoodTable {
  id?: number;
  name: string;
  portion_g: number;
  kcal: number;
  created_at: number; // UNIX timestamp (ms)
  updated_at: number; // UNIX timestamp (ms)
}

//  ========================================================
//  UTILITIES
//  ========================================================

export function toFoodTable(food: FoodDTO): FoodTable {
  return {
    id: food.id, // optional
    name: food.name,
    portion_g: food.portionGrams,
    kcal: food.kcal,
    created_at: -1,
    updated_at: -1,
  };
}

export function toFoodDTO(food: FoodTable): FoodDTO {
  return {
    id: food.id || -1,
    name: food.name,
    portionGrams: food.portion_g,
    kcal: food.kcal,
  };
}

//  ========================================================
//  API CONTRACT/DTO
//  ========================================================

export const FoodDtoSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  portionGrams: z.number().positive(),
  kcal: z.number().nonnegative(),
});

export type FoodDTO = z.infer<typeof FoodDtoSchema>;

export const FoodArraySchema = z.array(FoodDtoSchema);
