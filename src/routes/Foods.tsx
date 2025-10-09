import DashGrid from "@/components/DashGrid";
import { DashItem } from "@/components/DashItem";

export default function Foods() {
  return (
    <DashGrid>
      <DashItem colSpan={1}>Foods List</DashItem>
      <DashItem colSpan={1}>Foods List</DashItem>
      <DashItem colSpan={1}>Foods List</DashItem>
      <DashItem colSpan={2}>Foods List</DashItem>
      <DashItem colSpan={1}>Foods List</DashItem>
    </DashGrid>
  );
}
