import { Header } from "../components/Layout/Header.jsx";
import { Footer } from "../components/Layout/Footer.jsx";
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
import {AuditProgress} from "../components/AuditProgress/AuditProgress.jsx";
import CustomThemeProvider from "./Theme.jsx";

const drawerWidth = 260;

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: open
            ? theme.transitions.easing.easeOut
            : theme.transitions.easing.sharp,
        duration: open
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.leavingScreen,
    }),
}));

// Header der Sidebar (enthält das Logo und den Close-Button)
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

    const isDashboardPage = location.hash.includes("/dashboard");
    const isPerformAuditPage = location.pathname.includes("/perform-audit");
    const isEvaluationPage = location.pathname.includes("/evaluation");

    return (
        <Box className="flex overflow-hidden h-full"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            marginLeft: open ? 0 : `-${drawerWidth}px`,
        }}>
            {/* Header */}
            <Box sx={{ height: 74 }}>
                <Header data-cy="header"/>
            </Box>
            {/* Icon-Button zum Öffnen der Sidebar */}
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

            {/* Sidebar-Komponente */}
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
                {/* Header der Sidebar */}
                <DrawerHeader>
                    <div className="flex items-center mt-2">
                        <img
                            src="/logo-insight.png"
                            alt="Logo"
                            className="w-8 h-8 mr-2"
                        />
                        <h2 className="text-4xl font-medium">InSight</h2>
                    </div>

                    {/* Icon-Button zum Schließen der Sidebar */}
                    <IconButton onClick={closeSidebar} data-cy="close-icon">
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                {/* Trennlinie */}
                <Divider className="pt-2" />

                {/* Liste von Links in der Sidebar */}
                <List>
                    {links.map((link, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton component={Link} to={link.href}>
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={`/manage-categories-and-questions`}>
                            <ListItemText primary="Kategorien und Fragen verwalten" />
                        </ListItemButton>
                    </ListItem>
                    {isPerformAuditPage && auditId && (
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/evaluation/${auditId}`} data-cy="evaluationButton">
                                <ListItemText primary="Evaluation" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {isEvaluationPage && auditId && (
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/perform-audit/${auditId}`}>
                                <ListItemText primary="Audit durchführen" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
                <Divider />
                {location.pathname.includes("/perform-audit") && <AuditProgress progress={progress} />}

            </Drawer>

            <Main open={open} className="flex-1 ml-64 px-10 pb-4 overflow-y-auto" id="scroll-main">
                <CustomThemeProvider>
                    {children}
                </CustomThemeProvider>
            </Main>

            {/* Footer */}
            <Box sx={{ height: 64, marginLeft: open ? 0 : `+${drawerWidth}px` }}>
                <Footer data-cy="footer"/>
            </Box>
        </Box>
    );
}