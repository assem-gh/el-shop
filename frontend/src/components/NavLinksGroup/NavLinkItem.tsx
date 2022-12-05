import React from "react";
import { Stack, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { IconType } from "react-icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { TbLineDotted } from "react-icons/tb";
import useStyles from "./navGroup.style";

interface NavItemLinkProps {
  collapsed: boolean;
  path: string;
  label: string;
  icon: IconType;
}

const NavLinkItem = ({ collapsed, path, icon, label }: NavItemLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;
  const { classes, cx, theme } = useStyles({ collapsed, isActive });

  const LinkIcon = icon;

  return (
    <Stack spacing={4}>
      <Tooltip key={label} disabled={!collapsed} label={label} position="right">
        <UnstyledButton
          className={cx(classes.flex, classes.navItem)}
          component={RouterLink}
          to={path}
          py={collapsed ? "md" : "xs"}
        >
          {collapsed ? (
            <LinkIcon size={18} />
          ) : (
            <>
              <TbLineDotted size={24} />
              <Text ml="xs" sx={{ flexGrow: 1 }} size="md">
                {label}
              </Text>
            </>
          )}
        </UnstyledButton>
      </Tooltip>
    </Stack>
  );
};

export default NavLinkItem;
