import { COLORS } from "@/styles/Colors";
import styled from "styled-components";

const FormContainer = styled.form`
  color: ${COLORS.textPrimary};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export default FormContainer;
