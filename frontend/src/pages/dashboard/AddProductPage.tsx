import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { MdAdd } from "react-icons/md";
import { Button } from "@mantine/core";
import AddProductForm from "../../components/AddProductForm/AddProductForm";

const AddProductPage = () => {
  return (
    <>
      <PageHeader
        title="Add New Product"
        actions={
          <Button variant="light" leftIcon={<MdAdd />}>
            create
          </Button>
        }
      />
      <AddProductForm />
    </>
  );
};

export default AddProductPage;