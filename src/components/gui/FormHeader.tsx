import styled from "styled-components";
import { COLORS } from "@/styles/Colors";

// Container: row with space-between
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLORS.textPrimary};
  width: 100%;
`;

// Label on the left
const Label = styled.h1`
  font-weight: 600;
  font-size: 2rem;
`;

interface FormHeaderProps {
  title: string;
  button?: React.ReactNode;
}

const FormHeader = ({ title, button }: FormHeaderProps) => {
  return (
    <HeaderRow>
      <Label>{title}</Label>
      {button}
    </HeaderRow>
  );
};

export default FormHeader;
