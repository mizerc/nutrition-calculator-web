import FormContainer from "@/components/gui/FormContainer";
import FormInput from "@/components/gui/FormInput";
import VList from "@/components/gui/VList";
import { useApi } from "@/hooks/useApi";
import type { Food } from "@/modules/foods/types/Food";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Meal } from "../types/Meal";
import FormHeader from "@/components/gui/FormHeader";
import MealFoodList from "../components/MealFoodList";
import Button from "@/components/gui/Button";

const MealCreate = () => {
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meal>({
    id: 0,
    name: "",
  });
  const [mealFoods, setMealFoods] = useState<Array<Food>>([]);

  const { execute, loading } = useApi<Meal>({
    url: "/meals",
    method: "post",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await execute(meal);
    navigate("/meals/list");
  };

  const addFoodToMeal = (food: Food) => {
    if (!mealFoods.find((f) => f.id === food.id)) {
      setMealFoods((prev) => [...prev, food]);
    }
  };

  const removeFoodFromMeal = (foodId: number) => {
    setMealFoods((prev) => prev.filter((f) => f.id !== foodId));
  };

  if (loading) return <div>Submitting...</div>;

  return (
    <VList>
      <FormContainer onSubmit={handleSubmit}>
        <FormHeader title="Meal Create" button={<Button>Save</Button>} />

        <FormInput label="Name" value={meal.name} onChange={handleChange} />
        <MealFoodList />
      </FormContainer>
    </VList>
  );
};

export default MealCreate;
