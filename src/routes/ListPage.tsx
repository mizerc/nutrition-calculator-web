import React from "react";
import ContentContainer from "../components/ContentContainer";
import {
  AddButton,
  Header,
  Table,
  TableBody,
  TableHeader,
  Title,
} from "../components/Table";
import VList from "@/components/VList";

const ListPage: React.FC = () => {
  // Example data
  const data = [
    { id: 1, name: "Item 1", status: "Active" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 2, name: "Item 2", status: "Inactive" },
    { id: 3, name: "Item 3", status: "Active" },
  ];

  return (
    <VList>
      <Header>
        <Title>ListPage</Title>
        <AddButton to={"/"}>+ Add New</AddButton>
      </Header>

      <Table>
        <TableHeader>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </VList>
  );
};

export default ListPage;
