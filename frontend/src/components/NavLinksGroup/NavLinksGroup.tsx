import { Dispatch, SetStateAction } from "react";
import { Collapse, Stack, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { IconType } from "react-icons";
import useStyles from "./navGroup.style";
import { BsDashSquare } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import NavLinkItem from "./NavLinkItem";
import { Link } from "../../data/navLinks";

interface NavLinksControlProps {
  setOpened: Dispatch<SetStateAction<boolean>>;
  name: string;
  collapsed: boolean;
  icon: IconType;
  links: Link[];
  path: string;
}

const NavLinksGroup = ({
  name,
  icon: Icon,
  links,
  path,
  collapsed,
  setCollapsed,
}: NavLinksControlProps) => {
  const [showLinks, setShowLinks] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHasLinks = links.length > 0;

  const isActive = useMemo(() => {
    return pathname === path || links.some((l) => l.path === pathname);
  }, [pathname]);

  const { classes, cx, theme } = useStyles({ collapsed, isActive });
  const handleClick = () => {
    if (!isHasLinks) navigate(path);
    else setShowLinks((prev) => !prev);
  };

  const iconColor = isActive ? theme.colors[theme.primaryColor][6] : "inherit";
  return (
    <>
      {((collapsed && !isHasLinks) || !collapsed) && (
        <Tooltip
          disabled={!collapsed || isHasLinks}
          label={name}
          position="right"
        >
          <UnstyledButton
            px="lg"
            pb={0}
            className={cx(classes.itemControl, classes.flex)}
            onClick={handleClick}
          >
            <Icon color={iconColor} size={18} className={classes.leftIcon} />
            <Text className={classes.label}>{name}</Text>
            {links.length > 0 && (
              <TbChevronDown size={18} className={classes.rightIcon} />
            )}
          </UnstyledButton>
        </Tooltip>
      )}

      {isHasLinks && (
        <Collapse
          py={collapsed ? 0 : "xs"}
          bg={
            !collapsed
              ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.1)
              : "inherit"
          }
          in={collapsed || showLinks}
        >
          <Stack spacing={4}>
            {links.map((link) => (
              <NavLinkItem key={link.path} collapsed={collapsed} {...link} />
            ))}
          </Stack>
        </Collapse>
      )}
    </>
  );
};

export default NavLinksGroup;

