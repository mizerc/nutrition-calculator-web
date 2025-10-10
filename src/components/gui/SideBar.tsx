// Sidebar.tsx
import { COLORS } from "@/styles/Colors";
import React from "react";
import styled from "styled-components";

// Sidebar
export const BaseSidebar = styled.div`
  background-color: ${COLORS.siderbarBg};
  border-right: 1px solid ${COLORS.siderbarBorder};
  color: ${COLORS.textPrimary};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 16rem;
  display: flex;
  flex-direction: column;
`;

// Topbar inside sidebar or page
export const Topbar = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.siderbarBg};
  color: ${COLORS.textPrimary};
  border-bottom: 1px solid ${COLORS.siderbarBorder};
`;

// Content area inside sidebar
export const Content = styled.div`
  background-color: ${COLORS.siderbarContentBg};
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Footer inside sidebar
export const Footer = styled.div`
  color: ${COLORS.textPrimary};
  background-color: ${COLORS.siderbarFooterBg};
  border-top: 1px solid ${COLORS.siderbarBorder};
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

interface SidebarProps {
  topbarContent?: React.ReactNode;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  topbarContent,
  children,
  footerContent,
}) => {
  return (
    <BaseSidebar>
      <Topbar>{topbarContent}</Topbar>
      <Content>{children}</Content>
      <Footer>{footerContent}</Footer>
    </BaseSidebar>
  );
};

export default Sidebar;
