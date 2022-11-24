import React from 'react';
import {ActionIcon, Avatar, Box, Group, TextInput} from "@mantine/core";
import {TbSearch} from "react-icons/tb";
import {FiBell} from "react-icons/fi";

import useStyles from "./header.style";


const Header = () => {
    const {classes} = useStyles();

    return (
        <Box
            component="header"
            py="xs"
            className={classes.header}
        >
            <Group spacing="lg" className={classes.inner} noWrap>
                <Group>
                    <TextInput
                        rightSection={<ActionIcon>
                            <TbSearch size={16}/>
                        </ActionIcon>}
                        radius="sm"
                        placeholder="Search ..."/>
                </Group>

                <Group ml="auto">
                    <Group ml={50} spacing={16}>
                        <FiBell size={24}/>
                        <Avatar color="cyan" radius="xl">AD</Avatar>
                    </Group>
                </Group>

            </Group>
        </Box>
    );
};

export default Header;