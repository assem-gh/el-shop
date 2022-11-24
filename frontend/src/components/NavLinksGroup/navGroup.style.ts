import {createStyles} from "@mantine/core";

const useStyles = createStyles((theme, params: { collapsed: boolean, isActive: boolean }) => ({
    flex: {
        display: "flex",
        justifyContent: params.collapsed ? "center" : "flex-start",
        alignItems: "center",
    },
    itemControl: {
        width: "100%",
        height: "48px",
        position: "relative",
        gap: 16,
        backgroundColor: params.isActive ? theme.colors.blue[5] : "none",
        color: params.isActive ? theme.white : theme.black,
    },
    label: {
        position: "absolute",
        left: params.collapsed ? -24 : 64,
        opacity: params.collapsed ? 0 : 1,
        transition: "all 0.3s ease",
    },
    icon: {
        marginLeft: params.collapsed ? 0 : theme.spacing.md
    },
    navItem: {
        height: "24px",
        gap: 4,
        paddingLeft: params.collapsed ? 0 : "25%",
        "&:hover": {
            backgroundColor: theme.colors.blue[2],
        },
    }

}))

export default useStyles;