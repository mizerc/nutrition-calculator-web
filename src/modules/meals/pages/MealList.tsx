import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableButton,
  TableHeader,
} from "@/components/gui/Table";
import { useApi } from "@/hooks/useApi";
import type { MealGetDTO } from "../types/Meal";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/modules/core/componets/PageContainer";

const MealList: React.FC = () => {
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealGetDTO>();
  const { data, loading } = useApi<Array<MealGetDTO>>({
    url: "/meals",
    method: "get",
    autoFetch: true,
  });

  const handleClick = (meal: MealGetDTO) => {
    navigate(`/meals/view/${meal.id}`);
    setMeal(meal);
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  // const data = [
  //   { id: 1, name: "Item 1", status: "Active" },
  //   { id: 2, name: "Item 2", status: "Inactive" },
  // ];

  return (
    <PageContainer title="Meal List">
      <pre>{JSON.stringify(meal)}</pre>
      <Table>
        <TableHeader>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Name</th>
            <th>Foods</th>
            <th>Actions</th>
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.createdAt}</td>
              <td>{item.foods?.length}</td>
              <td>{item.name}</td>
              <td>
                <TableButton onClick={() => handleClick(item)}>
                  VIEW
                </TableButton>
                <TableButton>EDIT</TableButton>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </PageContainer>
  );
};

export default MealList;
