import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Outlet } from "react-router";

export const AppRoot = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
