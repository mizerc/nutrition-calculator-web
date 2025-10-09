import ContentContainer from "@/components/ContentContainer";
import Sidebar from "@/components/SideBar";
import SidebarHeading from "@/components/SidebarHeading";
import SidebarLink from "@/components/SidebarLink";
import Topbar from "@/components/TopBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-container">
      <Topbar>
        <h1 tw="text-lg font-semibold">Topbar</h1>
      </Topbar>
      <Sidebar topbarContent={<h2 tw="text-lg font-bold">A</h2>}>
        <SidebarHeading title="Overview" marginTop="1.5rem" />
        <SidebarLink to="/">Dashboard</SidebarLink>
        <SidebarHeading title="Foods" marginTop="1.5rem" />
        <SidebarLink to="/foods">Foods</SidebarLink>
        <SidebarLink to="/">List</SidebarLink>
        <SidebarLink to="/">Create</SidebarLink>
        <SidebarHeading title="Meals" marginTop="1.5rem" />
        <SidebarLink to="/meals">Meals</SidebarLink>
        <SidebarLink to="/">Create</SidebarLink>
      </Sidebar>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <div id="detail"></div>
    </div>
  );
}
export default Layout;
