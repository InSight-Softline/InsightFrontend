import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsOpen(open);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/new-audit", label: "New Audit" },
    { href: "/perform-audit", label: "Perform Audit" },
    { href: "/evaluation", label: "Evaluation" },
  ];

  return (
    <>
      {/* AppBar mit unsichtbarem Hintergrund */}
      <AppBar
        position="fixed"
        sx={{
          height: "48px", // Höhe des Headers
          width: "256px", // Gleiche Breite wie die Sidebar
          left: 0, // Links ausrichten
          backgroundColor: "transparent", // Unsichtbarer Header
          boxShadow: "none", // Kein Schatten
        }}
      >
        <Toolbar
          className="h-full flex items-center"
          sx={{
            minHeight: "48px !important",
            padding: "0 16px",
          }}
        >
          {/* Hamburger Menü */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ color: "black" }} // Farbe des Icons bleibt sichtbar
          >
            <MenuIcon />
          </IconButton>
          {/* Anwendungstitel */}
          <h1
            className="ml-4 text-lg font-semibold"
            style={{ color: "black" }} // Text bleibt sichtbar
          >
            Insight
          </h1>
        </Toolbar>
      </AppBar>

      {/* Drawer für die Sidebar */}
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className="w-64 h-full"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Sidebar-Header */}
          <div className="p-4 flex justify-between items-center border-b bg-gray-100">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Navigations-Links */}
          <List>
            {links.map((link, index) => (
              <ListItem button key={index} component={Link} to={link.href}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}