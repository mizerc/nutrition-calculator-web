import { useApi } from "@/hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import type { FoodDTO } from "../types/Food";
import FormContainer from "@/components/gui/FormContainer";
import FormInput from "@/components/gui/FormInput";
import PageContainer from "@/modules/core/componets/PageContainer";
import Button from "@/components/gui/Button";
import HList from "@/components/gui/HList";
import ButtonEdit from "@/components/gui/ButtonEdit";
import StatefulButton from "@/components/gui/ButtonToggle";
import { useEffect, useState, type FormEvent } from "react";

export default function FoodView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState<FoodDTO | null>(null);
  const [formData, setFormData] = useState<FoodDTO | null>(null);

  const [editMode, setEditMode] = useState(false);

  const { data, loading, error } = useApi<FoodDTO>({
    url: `/foods/${id}`,
    method: "get",
    autoFetch: true,
  });

  const { execute: updateExecute } = useApi<FoodDTO>({
    url: `/foods/${id}`,
    method: "patch",
  });

  useEffect(() => {
    if (data) {
      setOriginalData(data);
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name) return;
    setFormData((prev) => {
      if (!prev) return prev;
      switch (name) {
        case "id":
          return { ...prev, id: Number(value) };
        case "name":
          return { ...prev, name: value };
        case "portionGrams":
          return { ...prev, portionGrams: Number(value) };
        case "kcal":
          return { ...prev, kcal: Number(value) };
        default:
          return prev;
      }
    });
  };

  const getChangedFields = () => {
    const diff: Partial<FoodDTO> = {};
    if (!formData || !originalData) return diff;
    (Object.keys(formData) as (keyof FoodDTO)[]).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        (diff as any)[key] = formData[key];
      }
    });
    return diff;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldChanges = getChangedFields();
    if (Object.keys(fieldChanges).length === 0) return;

    await updateExecute(fieldChanges);

    navigate("/foods/list");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!formData) return <div>No data</div>;

  return (
    <PageContainer
      title="Food View"
      button={
        <HList>
          <StatefulButton
            onToggle={(active) => {
              setEditMode(active);
            }}
          >
            Edit
          </StatefulButton>
          <ButtonEdit>Delete</ButtonEdit>
        </HList>
      }
    >
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(formData)}</p>
      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          name="id"
          label="ID"
          value={String(formData.id)}
          readOnly={true}
        />
        <FormInput
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!editMode}
        />
        <FormInput
          name="portionGrams"
          label="Portion (g)"
          value={formData.portionGrams}
          readOnly={!editMode}
          onChange={handleChange}
        />
        <FormInput
          name="kcal"
          label="Kcal"
          value={formData.kcal}
          readOnly={!editMode}
          onChange={handleChange}
        />
        <Button type="submit">Save</Button>
      </FormContainer>
    </PageContainer>
  );
}
