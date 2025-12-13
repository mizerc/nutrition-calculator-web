import DashGrid from "@/components/gui/DashGrid";
import { DashItem } from "@/components/DashItem";
import PageContainer from "../core/componets/PageContainer";

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard">
      <h2 className="border-gray-400">SECTION</h2>
      <DashGrid>
        <DashItem />
        <DashItem />
        <DashItem />
        <DashItem />
        <DashItem colSpan={2} />
      </DashGrid>
      <h2 className="border-gray-400">SECTION</h2>
      <DashGrid>
        <DashItem colSpan={3} rowSpan={2} />
        <DashItem />
        <DashItem />
        <DashItem />
        <DashItem />
      </DashGrid>
    </PageContainer>
  );
}
