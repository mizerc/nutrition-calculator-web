import styled from "styled-components";

interface DashboardItemProps {
  colSpan?: number;
  rowSpan?: number;
}

export const DashItem = styled.div<DashboardItemProps>`
  background-color: #d6d6d6;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);

  font-weight: 600;
  color: #534848;

  border-radius: 8px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  grid-column: span ${({ colSpan = 1 }) => colSpan};
  grid-row: span ${({ rowSpan = 1 }) => rowSpan};
`;
