import React from "react";
import styled from "styled-components";

interface SidebarHeadingProps {
  title: string;
  marginTop?: string;
}

const Heading = styled.div<{ marginTop?: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #888; /* gray color */
  padding: 0.75rem 1rem 0.25rem 1rem;
  margin-top: ${({ marginTop }) => marginTop || "1rem"};
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const SidebarHeading: React.FC<SidebarHeadingProps> = ({ title, marginTop }) => {
  return <Heading marginTop={marginTop}>{title}</Heading>;
};

export default SidebarHeading;