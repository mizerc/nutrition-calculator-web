import { Link } from "react-router-dom";
import { styled } from "twin.macro";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
`;

const AddButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #4f46e5;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background-color: #6366f1;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  tr {
    background-color: #e0d0d0;
  }
  th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #181818;
    border-bottom: 1px solid #444;
  }
`;

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: #dfdfdf;
    }

    &:hover {
      background-color: #bfb1b1;
    }
  }
  td {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: #101010;
    border-bottom: 1px solid #444;
  }
`;

export { TableBody, TableHeader, Table, AddButton, Title, Header };
