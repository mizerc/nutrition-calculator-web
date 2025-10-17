import FormContainer from "@/components/gui/FormContainer";
import { useApi } from "@/hooks/useApi";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { MealCreateDTO, MealFoodItemDTO } from "../types/Meal";
import FoodPicker from "../components/FoodPicker";
import Button from "@/components/gui/Button";
import { type FoodDTO } from "@/modules/foods/types/Food";
import {
  Table,
  TableBody,
  TableButton,
  TableHeader,
} from "@/components/gui/Table";
import PageContainer from "@/modules/core/componets/PageContainer";

const MealCreate = () => {
  const navigate = useNavigate();

  const [meal, setMeal] = useState<MealCreateDTO>({
    name: "",
    foods: [],
  });

  const [foodList, setFoodList] = useState<MealFoodItemDTO[]>([]);

  const {
    execute: postNewMeal,
    loading: mealPostLoading,
    error: mealPostError,
  } = useApi<MealCreateDTO>({
    url: "/meals",
    method: "post",
  });

  if (mealPostLoading) return <div>Submitting...</div>;
  if (mealPostError) return <div>Error: {mealPostError}</div>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMeal: MealCreateDTO = { ...meal, foods: foodList };
    setMeal(newMeal);
    await postNewMeal(newMeal);
    navigate("/meals/list");
  };

  const removeFoodFromList = (foodId: number) => {
    setFoodList((prev) => [...prev.filter(({ food }) => food.id !== foodId)]);
  };

  const addFoodToList = (newFood: FoodDTO) => {
    const alreadyExist = foodList.find((f) => f.food.id === newFood.id);
    if (alreadyExist) return;

    setFoodList((prev) => [...prev, { food: newFood, weightGrams: 0 }]);
  };

  const updateWeight = (qFoodId: number, newWeight: number) => {
    console.log({ qFoodId, newWeight });
    setFoodList((prev) => [
      ...prev.map((item) =>
        item.food.id === qFoodId ? { ...item, weightGrams: newWeight } : item
      ),
    ]);
  };

  return (
    <PageContainer
      title="Meal Create"
      button={
        <Button type="submit" form="formmealcreate">
          Save
        </Button>
      }
    >
      <FormContainer
        id="formmealcreate"
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <pre>{JSON.stringify(meal)}</pre>
        <pre>{JSON.stringify(foodList)}</pre>

        <input
          type="text"
          value={meal.name}
          onChange={(e) => {
            setMeal((prev) => ({ ...prev, name: e.target.value }));
          }}
        ></input>

        <h3>FOOD LIST</h3>

        <FoodPicker onFoodPick={addFoodToList} />

        <Table>
          <TableHeader>
            <tr>
              <th>Food Name</th>
              <th>Weight (g)</th>
              <th>Actions</th>
            </tr>
          </TableHeader>

          <TableBody>
            {foodList.length === 0 && (
              <tr>
                <td colSpan={3}>No food added yet.</td>
              </tr>
            )}

            {foodList.map(({ food, weightGrams }) => {
              return (
                <tr key={food.id}>
                  <td>{food.name}</td>
                  <td>
                    <input
                      type="number"
                      value={weightGrams}
                      onChange={(e) =>
                        updateWeight(food.id!, Number(e.target.value))
                      }
                    ></input>
                  </td>
                  <td>
                    <TableButton
                      type="button"
                      onClick={() => removeFoodFromList(food.id!)}
                    >
                      Remove
                    </TableButton>
                  </td>
                </tr>
              );
            })}
          </TableBody>
        </Table>
      </FormContainer>
    </PageContainer>
  );
};

export default MealCreate;
