import { AppBar, IconButton, Drawer, List, ListItem, ListItemText, Link} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useSidebar } from "../../contexts/SidebarContext.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";


export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery("(max-width:600px)");

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/new-audit", label: "New Audit" },
    { href: "/perform-audit", label: "Perform Audit" },
    { href: "/evaluation", label: "Evaluation" },
  ];

  return (
    <>
      {/* Hamburger-Menü */}
      <AppBar position="fixed"
      sx={{
      height: "48px", // Höhe der AppBar
      width: isOpen ? "calc(100% - 256px)" : "100%", // Breite abhängig von der Sidebar
      left: isOpen ? "256px" : 0, // Position bei geöffneter Sidebar
      backgroundColor: "transparent",
      boxShadow: "none",
      }}
      >
        <IconButton edge="start" onClick={toggleSidebar} sx={{ color: "black", position: "absolute", left: 4 }}>
          <MenuIcon />
        </IconButton>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" :"persistent"}
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": { width: "256px", transition: "width 0.3s" },
        }}
      >
        <div>
          <IconButton onClick={toggleSidebar}>
            <CloseIcon />
          </IconButton>
          <List>
            {links.map((link, index) => (
              <ListItem key={index}>
                <Link to={link.href}>
                <ListItemText primary={link.label} />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};
export default Sidebar;