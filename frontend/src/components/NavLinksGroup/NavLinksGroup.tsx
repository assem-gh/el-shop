import { Dispatch, SetStateAction } from "react";
import { Collapse, Stack, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { IconType } from "react-icons";
import useStyles from "./navGroup.style";
import { BsDashSquare } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";

interface NavLinksControlProps {
  setActiveGroup: Dispatch<SetStateAction<string>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  name: string;
  collapsed: boolean;
  icon: IconType;
  links: any;
  isActive: boolean;
}

const NavLinksGroup = ({
  setActiveGroup,
  isActive,
  name,
  icon: Icon,
  links,
  collapsed,
  setCollapsed,
}: NavLinksControlProps) => {
  const { classes, cx, theme } = useStyles({ collapsed, isActive });

  const handleClick = () => {
    if (collapsed) {
      setCollapsed(false);
      setActiveGroup(() => name);
    } else {
      setActiveGroup((prev) => (prev === name ? "" : name));
    }
  };

  return (
    <>
      <Tooltip
        disabled={!collapsed || links.length > 0}
        label={name}
        position="right"
      >
        <UnstyledButton
          px="lg"
          pb={0}
          className={cx(classes.itemControl, classes.flex)}
          onClick={handleClick}
        >
          <Icon size={18} className={classes.leftIcon} />
          <Text className={classes.label}>{name}</Text>
          {links.length > 0 && (
            <TbChevronDown size={18} className={classes.rightIcon} />
          )}
        </UnstyledButton>
      </Tooltip>
      {links.length > 0 && (
        <Collapse
          py={collapsed ? 0 : "xs"}
          bg={theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.1)}
          in={collapsed || isActive}
        >
          <Stack spacing={4}>
            {links.map(
              (link: { label: string; path: string; icon: IconType }) => {
                const LinkIcon = link.icon;

                return (
                  <Tooltip
                    key={link.label}
                    disabled={!collapsed}
                    label={link.label}
                    position="right"
                  >
                    <UnstyledButton
                      className={cx(classes.flex, classes.navItem)}
                      component={RouterLink}
                      to={link.path}
                      py={collapsed ? "md" : "xs"}
                    >
                      {collapsed ? (
                        <LinkIcon size={14} />
                      ) : (
                        <>
                          <BsDashSquare size={14} />
                          <Text ml="md" sx={{ flexGrow: 1 }} size="sm">
                            {link.label}
                          </Text>
                        </>
                      )}
                    </UnstyledButton>
                  </Tooltip>
                );
              }
            )}
          </Stack>
        </Collapse>
      )}
    </>
  );
};

export default NavLinksGroup;

