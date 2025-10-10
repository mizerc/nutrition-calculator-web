import styled from "styled-components";
import { COLORS } from "@/styles/Colors";

const AppContainer = styled.div`
  background-color: ${COLORS.appBg};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default AppContainer;
