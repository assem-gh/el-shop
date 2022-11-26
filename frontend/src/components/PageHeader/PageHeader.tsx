import React, { ReactNode } from "react";
import { Box, Group, Text } from "@mantine/core";
import useStyles from "./pageHeader.style";

interface PagHeaderProps {
  title: string;
  actions: ReactNode;
}

const PageHeader = ({ title, actions }: PagHeaderProps) => {
  const { classes } = useStyles();
  return (
    <Box mt="md" mx={"auto"} className={classes.root}>
      <Group className={classes.inner} position="apart" align="baseline" px="md" py="xs">
        <Text size={14} weight={600}> {title}</Text>
        <Group>{actions}</Group>
      </Group>
    </Box>
  );
};

export default PageHeader;