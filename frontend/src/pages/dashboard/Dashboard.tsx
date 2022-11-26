import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { Group } from "@mantine/core";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Group px={32} position="center">
        <Outlet />
      </Group>
    </DashboardLayout>
  );
};

export default Dashboard;