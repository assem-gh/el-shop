import { createStyles } from "@mantine/core";
import { getThemeColor } from "../../utils";

const useStyles = createStyles((theme) => ({
  tableHeader: {
    backgroundColor: getThemeColor(theme, 8, 2),
    height: 48,
  },
}));

export default useStyles;
