import { Header } from "../components/Layout/Header.jsx";
import { Footer } from "../components/Layout/Footer.jsx";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import { useSidebar } from "./UseSidebar.jsx";

const drawerWidth = 240; // Breite der Sidebar

// Hauptinhalt mit animierter Margin beim Öffnen/Schließen der Sidebar
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open',})(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: open ? 0 : `-${drawerWidth}px`,
        transition: theme.transitions.create('margin',{
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

export function LayoutDefault({children}) {
        const theme = useTheme();
        const { open, closeSidebar, openSidebar } = useSidebar(); // Custom Hook für die Sidebar-Logik

// Links, die in der Sidebar angezeigt werden 
const links = 
        [{ href: "/dashboard", label: "Dashboard" },];

return (// Hauptcontainer mit flexibler Anzeige für Layout
        <Box sx={{display: 'flex'}}>
            <Header/>

            {/* Icon-Button zum Öffnen der Sidebar */}
            <IconButton 
              color="inherit" 
              aria-label="open drawer" 
              onClick={openSidebar} 
              data-cy="menu-icon"
              edge="start" 
              sx={{
                position: "fixed",
                top: "16px",
                left: "215px",
                zIndex: 1301,
                display: open ? "none" : "block",}}>
              <MenuIcon/>
            </IconButton>
          
          {/* Sidebar-Komponente */}
          <Drawer
            data-cy="sidebar" 
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {width: drawerWidth,boxSizing: 'border-box',},
            }} 
            variant="persistent" 
            anchor="left" 
            open={open}>
          
              {/* Header der Sidebar */}
            <DrawerHeader>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                  src="/logo-insight.png"
                  alt="Logo"
                  className="w-8 h-8 mr-2"
                  />
                  <h2 className="text-4xl font-medium">InSight</h2>
                </div>
                {/* Icon-Button zum Schließen der Sidebar */}
                <IconButton onClick={closeSidebar} data-cy="close-icon">
                  {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </DrawerHeader>

            {/* Trennlinie */}
            <Divider className="pt-2"/>

            {/* Liste von Links in der Sidebar */}
            <List>
              {links.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={link.href}>
                  <ListItemText primary={link.label}/>
                </ListItemButton>
              </ListItem>))}
            </List>
            {/* Trennlinie */}
            <Divider/>
          </Drawer>
          {/* Hauptinhalt */}
          <Main open={open} className="flex-1 ml-64 bg-gray-100 pb-24">
              <DrawerHeader/> {/* Platzhalter, um Platz für den Sidebar-Header zu schaffen */}
              {children} {/* Dynamische Inhalte der Seite */}
          </Main>
          <Footer />
        </Box>
    );
}