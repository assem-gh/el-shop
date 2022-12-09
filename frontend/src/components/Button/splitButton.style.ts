import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  button: {
    borderRadius: theme.radius.xl,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderRadius: theme.radius.xl,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));
