import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.sass";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff1e56",
    },
    secondary: {
      main: "#FFAC41",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
