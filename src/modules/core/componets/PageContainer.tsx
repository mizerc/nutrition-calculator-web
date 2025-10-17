import { COLORS } from "@/styles/Colors";
import styled from "styled-components";

const Container = styled.div`
  color: ${COLORS.textPrimary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 2rem;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${COLORS.textPrimary};
  width: 100%;
`;

const Label = styled.h1`
  font-weight: 600;
  font-size: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    align-self: center;
  }
`;

interface PageContainerProps {
  title?: string;
  children: React.ReactNode;
  button?: React.ReactNode;
}

function PageContainer({ title = "", button, children }: PageContainerProps) {
  return (
    <Container>
      <HeaderRow>
        <Label>{title}</Label>
        <ButtonContainer>{button}</ButtonContainer>
      </HeaderRow>
      {children}
    </Container>
  );
}

export default PageContainer;
