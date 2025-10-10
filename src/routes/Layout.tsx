import ContentContainer from "@/components/gui/ContentContainer";
import Sidebar from "@/components/gui/SideBar";
import SidebarHeading from "@/components/gui/SidebarHeading";
import SidebarLink from "@/components/gui/SidebarLink";
import Topbar from "@/components/HeaderBar";
import { Outlet } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import HeaderUser from "@/components/HeaderUser";
import Spacer from "@/components/gui/Spacer";
import { COLORS } from "@/styles/Colors";

function Layout() {
  const topContent = (
    <div
      style={{
        padding: "16px",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        color: COLORS.textPrimary,
      }}
    >
      <FaHamburger />
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          margin: 0,
          color: COLORS.textPrimary,
        }}
      >
        NutritionCalculator
      </h2>
    </div>
  );

  return (
    <div className="app-container">
      <Topbar>
        <h1 tw="text-lg font-semibold">Topbar</h1>
        <Spacer />
        <HeaderUser />
      </Topbar>
      <Sidebar topbarContent={topContent}>
        {/* Overview */}
        <SidebarHeading title="Overview" marginTop="1.5rem" />
        <SidebarLink to="/" icon={<FaHamburger />}>
          Dashboard
        </SidebarLink>
        {/* Foods */}
        <SidebarHeading title="Foods" marginTop="1.5rem" />
        <SidebarLink to="/foods/search">Search</SidebarLink>
        <SidebarLink to="/foods/list">List</SidebarLink>
        <SidebarLink to="/foods/create">Create</SidebarLink>
        {/* Meals */}
        <SidebarHeading title="Meals" marginTop="1.5rem" />
        <SidebarLink to="/meals/search">Search</SidebarLink>
        <SidebarLink to="/meals/list">List</SidebarLink>
        <SidebarLink to="/meals/create">Create</SidebarLink>
      </Sidebar>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <div id="detail"></div>
    </div>
  );
}
export default Layout;
