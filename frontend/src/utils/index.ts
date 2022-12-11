import { MantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

export const getThemeColor = (
  theme: MantineTheme,
  dark?: number,
  gray?: number
) => {
  if (theme.colorScheme === "dark") {
    return typeof dark !== "undefined" ? theme.colors.dark[dark] : theme.black;
  }
  return typeof gray !== "undefined" ? theme.colors.gray[gray] : theme.white;
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createNotification = (
  actionType: string,
  type: "error" | "success",
  errorMessage?: string
) => {
  let [entity, action] = actionType.split("/");
  if (entity.endsWith("s")) {
    entity = entity.slice(0, -1);
  }
  entity = capitalize(entity);
  action = capitalize(action);
  const actionWithSuffix = action.endsWith("e") ? action + "d" : action + "ed";

  showNotification({
    color: type === "error" ? "red" : "green",
    autoClose: type === "success",
    message:
      type === "success"
        ? `${entity}  ${actionWithSuffix} successfully`
        : errorMessage,
  });
};
