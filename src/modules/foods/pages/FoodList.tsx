import React from "react";
import {
  Table,
  TableBody,
  TableButton,
  TableHeader,
  TableRow,
} from "@/components/gui/Table";
import { useApi } from "@/hooks/useApi";
import type { Food } from "../types/Food";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/modules/core/componets/PageContainer";
import Button from "@/components/gui/Button";

const FoodList: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading } = useApi<Array<Food>>({
    url: "/foods",
    method: "get",
    autoFetch: true,
  });

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <PageContainer title="Food List">
      <Table>
        <TableHeader>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <TableButton
                  onClick={() => {
                    navigate(`/foods/view/${item.id}`);
                  }}
                >
                  EDIT
                </TableButton>
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageContainer>
  );
};

export default FoodList;
