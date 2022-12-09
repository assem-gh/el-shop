import React, { useCallback, useState } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import AppTable from "../../../components/AppTable/AppTable";
import AddCategoryModal from "../../../components/Modal/AddCategoryModal";

const CategoryListPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleAdd = useCallback(
    () => setOpenModal((prev) => !prev),
    [setOpenModal]
  );
  return (
    <>
      <PageHeader
        title="Categories"
        actions={
          <Button onClick={handleAdd} variant="light" leftIcon={<MdAdd />}>
            Add category
          </Button>
        }
      />
      <AppTable entity="category" />
      <AddCategoryModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default CategoryListPage;
