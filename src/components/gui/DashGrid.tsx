import styled from "styled-components";

const DashGrid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 150px; 
  gap: 1rem;
`;

export default DashGrid;
