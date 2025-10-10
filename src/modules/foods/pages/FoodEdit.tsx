import { useApi } from "@/hooks/useApi";
import { useParams } from "react-router-dom";
import type { Food } from "../types/Food";
import VList from "@/components/gui/VList";
import FormContainer from "@/components/gui/FormContainer";
import FormInput from "@/components/gui/FormInput";

export default function FoodView() {
  const { id } = useParams<{ id: string }>();

  const { data } = useApi<Food>({
    url: `/foods/${id}`,
    method: "get",
    autoFetch: true,
  });

  if (!data) return <div>Loading...</div>;

  return (
    <VList>
      <FormContainer>
        <FormInput label="ID" value={String(data.id)} readOnly />
        <FormInput label="Name" value={data.name} readOnly />
      </FormContainer>
    </VList>
  );
}
