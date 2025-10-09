// Sidebar.tsx
import React from "react";
import tw from "twin.macro";

const BaseSidebar = tw.div`
  fixed
  top-0
  left-0
  h-full

  w-64

  border
  bg-gray-800
  flex
  flex-col
`;

const Topbar = tw.div`
  h-16
  flex
  items-center
  justify-between
  border-b
  border-gray-400
`;

const Content = tw.div`
  flex-1
  overflow-y-auto
  p-2
  space-y-2
`;


const Footer = tw.div`
  h-32
  flex
  bg-gray-900
  items-center
  justify-between
  px-4
  border-t
  border-gray-700
`;

interface SidebarProps {
  topbarContent?: React.ReactNode;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ topbarContent, children, footerContent }) => {
  return (
    <BaseSidebar>
      <Topbar>{topbarContent}</Topbar>
      <Content>{children}</Content>
      <Footer>{footerContent}</Footer>
    </BaseSidebar>
  );
};

export default Sidebar;
