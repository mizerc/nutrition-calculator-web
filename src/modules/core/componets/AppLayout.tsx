import ContentContainer from "@/modules/core/componets/ContentContainer";
import Sidebar from "@/components/gui/SideBar";
import SidebarHeading from "@/components/gui/SidebarHeading";
import SidebarLink from "@/components/gui/SidebarLink";
import Topbar from "@/components/HeaderBar";
import { Outlet } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import HeaderUser from "@/components/HeaderUser";
import Spacer from "@/components/gui/Spacer";
import { COLORS } from "@/styles/Colors";
import AppContainer from "@/components/gui/AppContainer";
import Button from "@/components/gui/Button";
import { AppDb } from "@/modules/browsersql";

function Sidebar1() {
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
    <>
      <Topbar>
        <h1 tw="text-lg font-semibold"></h1>
        <Spacer />
        <HeaderUser />
      </Topbar>
      <Sidebar topbarContent={topContent}>
        {/* Overview */}
        <SidebarHeading title="Overview" />
        <SidebarLink to="/" icon={<FaHamburger />}>
          Dashboard
        </SidebarLink>
        {/* Foods */}
        <SidebarHeading title="Foods" />
        {/* <SidebarLink icon={<FaHamburger />} to="/foods/search">
          Search
        </SidebarLink> */}
        <SidebarLink icon={<FaHamburger />} to="/foods/list">
          List
        </SidebarLink>
        <SidebarLink icon={<FaHamburger />} to="/foods/create">
          Create
        </SidebarLink>
        {/* Meals */}
        <SidebarHeading title="Meals" />
        {/* <SidebarLink icon={<FaHamburger />} to="/meals/search">
          Search
        </SidebarLink> */}
        <SidebarLink icon={<FaHamburger />} to="/meals/list">
          List
        </SidebarLink>
        <SidebarLink icon={<FaHamburger />} to="/meals/create">
          Create
        </SidebarLink>
        <SidebarHeading title="Debug" />

        <SidebarLink icon={<FaHamburger />} to="/debug">
          Debug1
        </SidebarLink>
        <SidebarHeading title="Settings" />
        <Button
          onClick={async () => {
            AppDb.foods.clear();
            const now = Date.now();
            await AppDb.foods.bulkAdd([
              {
                name: "Banana",
                kcal: 105,
                portion_g: 100,
                created_at: now,
                updated_at: now,
              },
            ]);
          }}
        >
          Reset Food Table
        </Button>
      </Sidebar>
    </>
  );
}

function AppLayout() {
  return (
    <AppContainer>
      <Sidebar1 />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <div id="detail"></div>
    </AppContainer>
  );
}
export default AppLayout;
