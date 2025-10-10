// import tw from "twin.macro";
// const SidebarLink = tw.a`block py-2 px-4 border rounded hover:bg-gray-700`;

import { COLORS } from "@/styles/Colors";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const StyledNavLink = styled(NavLink)`
  color: ${COLORS.textPrimary};
    background: ${COLORS.sidebarButtonBg};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;

  &.active {
    background: ${COLORS.sidebarButtonActiveBg};
    color: ${COLORS.textPrimary};
    font-weight: 600;
  }

  &:hover {
    background: ${COLORS.sidebarButtonHoverBg};
    color: ${COLORS.textPrimaryAccent};
  }
`;

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children, icon }) => {
  return (
    <StyledNavLink to={to}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </StyledNavLink>
  );
};

export default SidebarLink;
