export type Meal = {
  id: number;
  name: string;
  // fk
  foodIds: Array<number>;
};
