import React from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import AddProductForm from "../../components/AddProductForm/AddProductForm";
import {Group, Text} from "@mantine/core";
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Group mb="md" py="md">
                <Text>Add New Product</Text>
            </Group>
            <Group grow px={32}>
                <AddProductForm/>
            </Group>
            <Outlet/>
        </DashboardLayout>
    );
};

export default Dashboard;