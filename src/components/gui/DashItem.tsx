import styled from "styled-components";

interface DashboardItemProps {
  colSpan?: number;
  rowSpan?: number;
}

export const DashItem = styled.div<DashboardItemProps>`
  background-color: #6fa67a;

  font-weight: 600;
  color: #000000;

  border-radius: 8px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  grid-column: span ${({ colSpan = 1 }) => colSpan};
  grid-row: span ${({ rowSpan = 1 }) => rowSpan};
`;
