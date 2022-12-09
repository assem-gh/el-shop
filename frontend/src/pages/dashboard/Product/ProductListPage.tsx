import React, { useCallback } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import AppTable from "../../../components/AppTable/AppTable";
import { useNavigate } from "react-router-dom";

const ProductsListPage = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    () => navigate("/admin/products/add"),
    [navigate]
  );
  return (
    <>
      <PageHeader
        title="Products"
        actions={
          <Button onClick={handleClick} variant="light" leftIcon={<MdAdd />}>
            Add new Product
          </Button>
        }
      />
      <AppTable entity="product" />
    </>
  );
};

export default ProductsListPage;