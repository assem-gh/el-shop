import { showNotification } from "@mantine/notifications";
import { GiCheckMark, GiPoisonCloud } from "react-icons/gi";
import React from "react";
import { capitalize } from "../../utils";

export const createNotification = (
  actionType: string,
  type: "error" | "success",
  errorMessage?: string
) => {
  let [entity, action] = actionType.split("/");

  if (entity.endsWith("ies")) {
    entity = entity.slice(0, -3) + "y";
  }
  if (entity.endsWith("s")) {
    entity = entity.slice(0, -1);
  }

  entity = capitalize(entity);
  action = capitalize(action);
  const actionWithSuffix = action.endsWith("e") ? action + "d" : action + "ed";

  showNotification({
    color: type === "error" ? "red" : "green",
    autoClose: type === "success" ? 2000 : false,
    radius: "xs",
    styles: (theme) => ({
      root: {
        border: "none",
        backgroundColor: type === "error" ? "#fdedee" : "#ebfbf6",
      },
      description: {
        color: theme.black,
      },
      closeButton: {
        color: theme.black,
        "&:hover": {
          backgroundColor:
            type === "error"
              ? theme.fn.darken("#fdedee", 0.1)
              : theme.fn.darken("#ebfbf6", 0.1),
        },
      },
    }),
    icon: type === "error" ? <GiPoisonCloud /> : <GiCheckMark />,
    message:
      type === "success"
        ? `${entity}  ${actionWithSuffix} successfully`
        : errorMessage,
  });
};
