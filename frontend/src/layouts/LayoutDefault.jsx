import { Header } from "../components/Layout/Header.jsx";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link, useLocation, useParams} from "react-router-dom";
import { useSidebar } from "./UseSidebar.jsx";
import { Footer } from "../components/Layout/Footer.jsx";
import {AuditProgress} from "../components/AuditProgress/AuditProgress.jsx";

const drawerWidth = 260;

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
        easing: open
            ? theme.transitions.easing.easeOut
            : theme.transitions.easing.sharp,
        duration: open
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.leavingScreen,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export function LayoutDefault({ progress, children }) {
    const theme = useTheme();
    const { open, closeSidebar, openSidebar } = useSidebar();
    const { auditId } = useParams();
    const location = useLocation();

    const links = [
        { href: "/dashboard", label: "Dashboard" }
    ];

    const isPerformAuditPage = location.pathname.includes("/perform-Audit");
    const isEvaluationPage = location.pathname.includes("/evaluation");

    return (
        <Box className="flex overflow-hidden">
            <CssBaseline />
            <Header />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openSidebar}
                data-cy="menu-icon"
                edge="start"
                sx={{
                    position: "fixed",
                    top: "9px",
                    left: "215px",
                    zIndex: 1301,
                    display: open ? "none" : "block",
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                data-cy="sidebar"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <div className="flex items-center mt-2">
                        <img
                            src="/logo-insight.png"
                            alt="Logo"
                            className="w-8 h-8 mr-2"
                        />
                        <h2 className="text-4xl font-medium">InSight</h2>
                    </div>
                    <IconButton onClick={closeSidebar} data-cy="close-icon">
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider className="pt-2" />
                <List>
                    {links.map((link, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton component={Link} to={link.href}>
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {isPerformAuditPage && auditId && (
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/evaluation/${auditId}`}>
                                <ListItemText primary="Evaluation" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {isEvaluationPage && auditId && (
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/perform-Audit/${auditId}`}>
                                <ListItemText primary="Audit durchführen" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
                <Divider />
                {location.pathname.includes("/perform-Audit") && <AuditProgress progress={progress} />}
            </Drawer>
            <Main open={open} className="flex-1 ml-64 pb-24">
                <DrawerHeader />
                {children}
            </Main>
            <Footer />
        </Box>
    );
}
