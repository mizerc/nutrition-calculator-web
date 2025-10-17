import { COLORS } from "@/styles/Colors";
import React from "react";
import styled from "styled-components";

interface SidebarHeadingProps {
  title: string;
}

const Heading = styled.div`
  color: ${COLORS.textSecondary};
  border-bottom: 1px solid ${COLORS.headerBottomBorder};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 1rem;
  letter-spacing: 0.05em;
`;

const SidebarHeading: React.FC<SidebarHeadingProps> = ({ title }) => {
  return <Heading>{title}</Heading>;
};

export default SidebarHeading;
