import React from "react";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { useStyles } from "./404.style";

const FourOhFour = () => {
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Page Not Found.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately,You may have mistyped the address, or the page has been
        moved to another URL.
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md">
          home page
        </Button>
      </Group>
    </Container>
  );
};

export default FourOhFour;
