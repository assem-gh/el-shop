import React, { useState } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { MdAdd } from "react-icons/md";
import { Button } from "@mantine/core";
import AddProductForm from "../../../components/AddProductForm/AddProductForm";
import AddCategoryModal from "../../../components/Modal/AddCategoryModal";

const AddProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <PageHeader
        title="Add New Product"
        actions={
          <Button
            onClick={() => setOpenModal((prev) => !prev)}
            variant="light"
            leftIcon={<MdAdd />}
          >
            Add category
          </Button>
        }
      />
      <AddProductForm />
      <AddCategoryModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default AddProductPage;
