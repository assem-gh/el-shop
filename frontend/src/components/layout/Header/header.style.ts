import {createStyles} from "@mantine/core";

const useStyles = createStyles((theme) => ({
header:{
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.white,
    height: 72,
},
    inner:{
    height:"100%"
    },
}))

export default useStyles;