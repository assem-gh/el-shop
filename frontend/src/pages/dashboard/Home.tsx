import React from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import Stat from "../../components/Stats/Stat";
import { BsCollection } from "react-icons/bs";

const Home = () => {
  const totalProducts = useAppSelector((state) => state.product.ids.length);
  const totalCategories = useAppSelector((state) => state.category.ids.length);
  return (
    <Stack>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        <Stat
          title={"Products"}
          value={`${totalProducts}`}
          icon={BsCollection}
        />

        <Stat
          title={"Categories"}
          value={`${totalCategories}`}
          icon={BsCollection}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default Home;
