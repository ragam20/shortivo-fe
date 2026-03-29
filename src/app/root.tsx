import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { AuthContext } from "@/lib/auth-context";
import { useContext } from "react";
import { Outlet } from "react-router";

export const AppRoot = () => {
  const ctx = useContext(AuthContext);

  return (
    <DashboardLayout
      user={{
        id: 1,
        username: "Marry Jane",
        email: "marry.jane@gmail.com",
        imgURL: null,
        createdAt: "",
        updatedAt: "",
      }}
    >
      <Outlet />
    </DashboardLayout>
  );
};
