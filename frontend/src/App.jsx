import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./pages/Sidebar/Sidebar.jsx";
import AppRouter from "./router/AppRouter.jsx";
import "./styles/index.css";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#c4171f",
          padding: "16px",
          textAlign: "center",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: "2rem",
          borderRadius: "5px",
        },
        bar: {
          backgroundColor: "#c4171f",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          strokeLinecap: "round",
          borderRadius: 30,
        },
        svg: {
          color: "#c4171f",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        caption: {
          fontSize: "1.25rem", // Increase font size here
        },
        body2: {
          fontSize: "1.25rem", // Increase font size for LinearProgress percentage
        },
      },
    },
  },
});

function App() {
  return (
    <Router>
      <div className="flex mt-16">
        <Sidebar />
        <div className="ml-64 p-4 w-full">
          <ThemeProvider theme={theme}>
            <AppRouter /> {/* Use the AppRouter component */}
          </ThemeProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
