import React from "react";
import { Group, Paper, Text } from "@mantine/core";
import { IconType } from "react-icons";
import { useStyles } from "./stat.style";

interface StateProps {
  title: string;
  value: string;
  icon: IconType;
}

const Stat = ({ title, value, icon: Icon }: StateProps) => {
  const { classes } = useStyles();

  return (
    <Paper withBorder p="md" radius="md" key={title}>
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
        </Text>
        <Icon className={classes.icon} size={22} />
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value}>{value}</Text>
      </Group>
    </Paper>
  );
};

export default Stat;
