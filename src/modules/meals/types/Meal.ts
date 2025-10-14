import type { Food } from "@/modules/foods/types/Food";

export type Meal = {
  id: number;
  timestamp_utc: number;
  name: string;
  // food.id => {weigth, Food}
  foodWeights: Array<{ weight: number; food: Food }>;
};

export type MeaCreatePostDTO = {
  timestamp_utc: number;
  name: string;
  // food.id => {weigth, Food}
  foodWeights: Array<{ weight: number; food: Food }>;
};
