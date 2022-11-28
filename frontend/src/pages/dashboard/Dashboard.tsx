import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import { Group } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import productService from "../../store/api/productService";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productService.getAllProduct({ page: 0, size: 20 }));
  }, []);
  return (
    <DashboardLayout>
      <Group px={32} grow position="center">
        <Outlet />
      </Group>
    </DashboardLayout>
  );
};

export default Dashboard;