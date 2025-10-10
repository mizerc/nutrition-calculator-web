import DashGrid from "@/components/DashGrid";
import { DashItem } from "@/components/DashItem";

export default function Dashboard() {
  return (
    <>
      <h1 className="border-gray-400">DASHBOARD</h1>
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
    </>
  );
}
