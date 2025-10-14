import { useApi } from "@/hooks/useApi";
import { useParams } from "react-router-dom";
import type { Meal } from "../types/Meal";
import FormContainer from "@/components/gui/FormContainer";
import FormInput from "@/components/gui/FormInput";
import PageContainer from "@/modules/core/componets/PageContainer";

export default function MealView() {
  const { id } = useParams<{ id: string }>();

  const { data } = useApi<Meal>({
    url: `/foods/${id}`,
    method: "get",
    autoFetch: true,
  });

  if (!data) return <div>Loading...</div>;

  return (
    <PageContainer title="Meal View">
      <FormContainer>
        <FormInput label="ID" value={String(data.id)} readOnly />
        <FormInput label="Name" value={data.name} readOnly />
        {data.foodWeights.map((item) => {
          return <p>{item.food.name}</p>;
        })}
      </FormContainer>
    </PageContainer>
  );
}
