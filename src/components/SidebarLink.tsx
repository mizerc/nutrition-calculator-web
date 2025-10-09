// import tw from "twin.macro";
// const SidebarLink = tw.a`block py-2 px-4 border rounded hover:bg-gray-700`;

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;

  &.active {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-weight: 600;
  }

  &:hover {
    background: rgb(115, 160, 243);
    color: #fff;
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
