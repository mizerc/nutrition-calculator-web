import Button from "@/components/gui/Button";
import FormContainer from "@/components/gui/FormContainer";
import FormInput from "@/components/gui/FormInput";
import { useApi } from "@/hooks/useApi";
import PageContainer from "@/modules/core/componets/PageContainer";
import type { FoodDTO } from "@/modules/foods/types/Food";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const FoodCreate = () => {
  const navigate = useNavigate();

  const [food, setFood] = useState<FoodDTO>({
    id: 0,
    name: "",
    portionGrams: 0,
    kcal: 0,
  });

  const { execute, loading } = useApi<FoodDTO>({
    url: "/foods",
    method: "post",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("ASDIOJAS");
    async function submit() {
      e.preventDefault();
      await execute(food);
      navigate("/foods/list");
    }
    submit();
  };

  if (loading) return <div>Submitting...</div>;

  return (
    <PageContainer
      title="Food Create"
      button={
        <Button form="foodForm" type="submit">
          Save
        </Button>
      }
    >
      <pre>{JSON.stringify(food)}</pre>
      <FormContainer id="foodForm" onSubmit={handleSubmit}>
        <FormInput
          name="name"
          label="Name"
          placeholder="Orange Juice"
          value={food.name}
          onChange={handleChange}
        />
        <FormInput
          name="portionGrams"
          label="Portion (g)"
          placeholder="100"
          value={food.portionGrams}
          type="number"
          onChange={handleChange}
        />
        <FormInput
          name="kcal"
          label="Kcal"
          placeholder={"250"}
          type={"number"}
          value={food.kcal}
          onChange={handleChange}
        />

        {/* <FieldGroup>
          <Label>Image URL</Label>
          <Input
            name="image"
            type="url"
            value={food.image}
            onChange={handleChange}
            placeholder="https://example.com/food.jpg"
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Portion</Label>
          <Input
            name="portion"
            value={food.portion}
            onChange={handleChange}
            placeholder="100g / 1 unit"
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Kcal per portion</Label>
          <Input
            name="kcal"
            type="number"
            value={food.kcal}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Carbs (g)</Label>
          <Input
            name="carbs"
            type="number"
            value={food.carbs}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Protein (g)</Label>
          <Input
            name="protein"
            type="number"
            value={food.protein}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Fat (g)</Label>
          <Input
            name="fat"
            type="number"
            value={food.fat}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Fiber (g)</Label>
          <Input
            name="fiber"
            type="number"
            value={food.fiber}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Price ($)</Label>
          <Input
            name="price"
            type="number"
            step="0.01"
            value={food.price}
            onChange={handleChange}
          />
        </FieldGroup> */}
      </FormContainer>
    </PageContainer>
  );
};

export default FoodCreate;
