import React from "react";
import {
  AddButton,
  Header,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  Title,
} from "@/components/gui/Table";
import VList from "@/components/gui/VList";
import { useApi } from "@/hooks/useApi";
import type { Food } from "../types/Food";
import { useNavigate } from "react-router-dom";
import Spacer from "@/components/gui/Spacer";

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
    <VList>
      <Header>
        <Title>FoodList</Title>
        <Spacer />
        <AddButton to={"/foods/create"}>+ Add New</AddButton>
      </Header>

      <Table>
        <TableHeader>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => {
                navigate(`/foods/view/${item.id}`);
              }}
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </VList>
  );
};

export default FoodList;
