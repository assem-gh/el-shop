import {ReactNode} from 'react';
import {AppShell, Box} from '@mantine/core';

import SideNav from '../SideNAv/SideNav';
import Header from '../Header/Header';

interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <AppShell
            styles={() => ({
                body: {minHeight: '100vh'},
                main: {
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingLeft: "calc(var(--mantine-navbar-width, 0px))",
                    transition: "padding 0.2s linear"
                },
            })}
            navbar={<SideNav/>}
        >
            <Header/>
            <Box p="lg">
                {children}
            </Box>

        </AppShell>
    );
};

export default DashboardLayout;
