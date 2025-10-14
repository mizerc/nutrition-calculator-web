import FormContainer from "@/components/gui/FormContainer";
import { useApi } from "@/hooks/useApi";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { MeaCreatePostDTO } from "../types/Meal";
import FoodPicker from "../components/FoodPicker";
import Button from "@/components/gui/Button";
// import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { type Food } from "@/modules/foods/types/Food";
import {
  Table,
  TableBody,
  TableButton,
  TableHeader,
} from "@/components/gui/Table";
import PageContainer from "@/modules/core/componets/PageContainer";

// interface IMealCreateForm {
//   name: string;
//   timestamp: string;
//   foodList: Array<string>;
// }

const MealCreate = () => {
  const navigate = useNavigate();

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IMealCreateForm>();

  // const onSubmit: SubmitHandler<IMealCreateForm> = (data) => console.log(data);

  const [foodList, setFoodList] = useState<{ food: Food; weight: number }[]>(
    []
  );

  // const [listFoods, setListFoods] = useState<Food[]>([]);

  const [meal, setMeal] = useState<MeaCreatePostDTO>({
    timestamp_utc: Date.now(),
    name: "",
    foodWeights: [],
  });
  // const [mealFoods, setMealFoods] = useState<Array<Food>>([]);

  // cosnt

  const { execute, loading } = useApi<MeaCreatePostDTO>({
    url: "/meals",
    method: "post",
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setMeal((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(e);
  //   // await execute(meal);
  //   // navigate("/meals/list");
  // };

  // const addFoodToMeal = (food: Food) => {
  //   if (!mealFoods.find((f) => f.id === food.id)) {
  //     setMealFoods((prev) => [...prev, food]);
  //   }
  // };

  // const removeFoodFromMeal = (foodId: number) => {
  //   setMealFoods((prev) => prev.filter((f) => f.id !== foodId));
  // };

  // Remove food from selected list
  const removeFoodFromMeal = (foodId: number) => {
    setFoodList((prev) => [...prev.filter(({ food }) => food.id !== foodId)]);
    // setMeal((prev) => ({
    //   ...prev,
    //   // foods: [...prev.foods.filter((f) => f.food.id !== foodId)],
    //   foodWeights: {
    //     ...prev.foodWeights,
    //     [foodId]: undefined,
    //   },
    // }));
  };

  const handleAddFoodToList = (newFood: Food) => {
    // prevent duplicates
    // if (!selectedFoods.find((f) => f.id === food.id)) {
    // }

    const alreadyExist = foodList.find((f) => f.food.id === newFood.id);
    if (alreadyExist) return;

    // const alreadyExist = meal.foodWeights.has(newFood.id);

    setFoodList((prev) => [...prev, { food: newFood, weight: 0 }]);
    // setMeal((prev) => {
    //   const newFoodWeights = new Map(prev.foodWeights);
    //   newFoodWeights.set(newFood.id, { weight: 10, food: newFood });
    //   return {
    //     ...prev,
    //     foodWeights: newFoodWeights,
    //   };
    // });
  };

  if (loading) return <div>Submitting...</div>;

  // const localDate = new Date(meal.timestamp_utc);
  // const formattedDate = localDate.toLocaleDateString(undefined, {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  const handleOnWeightChange = (foodId: number, newWeight: number) => {
    // [{food, weight},{food, weight},{food, weight},{food.id, weight},{food, weight}]
    setFoodList((prev) => [
      ...prev.map((item) =>
        item.food.id === foodId ? { ...item, weight: newWeight } : item
      ),
    ]);
    //xxx
    // setMeal((prev) => {
    //   const newFoodWeights = new Map(prev.foodWeights); // copy (immutability)

    //   const existing = newFoodWeights.get(foodId);
    //   if (!existing) return prev; // no such food → nothing to change

    //   newFoodWeights.set(foodId, { ...existing, weight: newWeight });

    //   return {
    //     ...prev,
    //     foodWeights: newFoodWeights,
    //   };
    // });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function submit() {
      //  Mount DTO expected by API
      const newMeal = { ...meal, foodWeights: foodList };
      setMeal(newMeal);
      await execute(newMeal);
      navigate("/meals/list");
    }
    submit();
  };
  // I need to update the foodWeights Map from array [{food, weight}]

  return (
    <PageContainer title="Meal Create" button={<Button>Save</Button>}>
      {/* <FormContainer onSubmit={handleSubmit(onSubmit)}>
       */}
      <FormContainer
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <pre>{JSON.stringify(meal)}</pre>

        <input
          type="text"
          value={meal.name}
          onChange={(e) => {
            setMeal((prev) => ({ ...prev, name: e.target.value }));
          }}
        ></input>

        {/* <Controller
          name="name"
          control={control}
          render={({ field }) => <FormInput label="Name" {...field} />}
        /> */}

        {/* <Controller
          name="timestamp"
          control={control}
          render={({ field }) => <FormInput label="Time" {...field} />}
        /> */}

        <p>FOOD LIST</p>
        <FoodPicker onFoodPick={handleAddFoodToList} />
        <Table>
          <TableHeader>
            <tr>
              <th>FOOD_NAME</th>
              <th>WEIGTH (g)</th>
              <th>ACTIONS</th>
            </tr>
          </TableHeader>

          <TableBody>
            {meal.foodWeights.length === 0 && <tr>No food added yet</tr>}
            {foodList.map(({ food, weight }) => {
              return (
                <tr key={food.id}>
                  <td>{food.name}</td>
                  <td>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) =>
                        handleOnWeightChange(food.id, Number(e.target.value))
                      }
                    ></input>
                  </td>
                  <td>
                    <TableButton
                      type="button"
                      onClick={() => removeFoodFromMeal(food.id)}
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
