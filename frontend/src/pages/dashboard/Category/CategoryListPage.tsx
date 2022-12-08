import React from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import AppTable from "../../../components/AppTable/AppTable";

const CategoryListPage = () => {
  return (
    <>
      <PageHeader
        title="Categories"
        actions={
          <Button variant="light" leftIcon={<MdAdd />}>
            create
          </Button>
        }
      />
      <AppTable entity="category" />
    </>
  );
};

export default CategoryListPage;
