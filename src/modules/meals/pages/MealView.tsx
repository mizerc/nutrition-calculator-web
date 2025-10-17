import { useApi } from "@/hooks/useApi";
import { useParams } from "react-router-dom";
import type { MealGetDTO } from "../types/Meal";
import FormContainer from "@/components/gui/FormContainer";
import FormInput from "@/components/gui/FormInput";
import PageContainer from "@/modules/core/componets/PageContainer";
import { Table, TableBody, TableHeader } from "@/components/gui/Table";

export default function MealView() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useApi<MealGetDTO>({
    url: `/meals/${id}`,
    method: "get",
    autoFetch: true,
  });

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <div>Error: {error}</div>;
  if (!data || !data.createdAt) return <div>No data</div>;

  return (
    <PageContainer title="Meal View">
      <FormContainer>
        <FormInput name="id" label="ID" value={String(data.id)} readOnly />
        <FormInput
          name="createdAt"
          label="CreatedAt"
          value={new Date(data.createdAt).toString()}
          readOnly
        />
        <FormInput name="name" label="Name" value={data.name} readOnly />
        <FormInput
          name="total_kcal"
          label="Total Kcal"
          value={data.totalKcal}
          readOnly
        />
        <Table>
          <TableHeader>
            <tr>
              <th>Weight</th>
              <th>Name</th>
              <th>Kcal</th>
            </tr>
          </TableHeader>
          <TableBody>
            {data.foods?.map((item) => {
              return (
                <tr key={item.food.id}>
                  <td>{item.weightGrams}</td>
                  <td>{item.food.name}</td>
                  <td>{item.food.kcal}</td>
                </tr>
              );
            })}
          </TableBody>
        </Table>
      </FormContainer>
    </PageContainer>
  );
}
