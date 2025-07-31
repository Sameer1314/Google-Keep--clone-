import React, { createContext, useMemo, useState, useContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const theme = useMemo(() => {
    const common = { palette: { mode } };

    const light = {
      palette: {
        background: { default: "#fafafa", paper: "#fff" },
        text: { primary: "#000", secondary: "#555" },
        divider: "rgba(0,0,0,0.12)",
        action: { hover: "rgba(0,0,0,0.04)" },
      },
    };

    const dark = {
      palette: {
        background: { default: "#202124", paper: "#202124" },
        text: { primary: "#ECEDEF", secondary: "#FFF" },
        divider: "rgba(255,255,255,0.12)",
        action: { hover: "rgba(63,108,71,0.08)", selected: "#3F6C47" },
      },
    };

    return createTheme({ ...common, ...(mode === "dark" ? dark : light) });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// named export for consuming
export const useThemeContext = () => useContext(ThemeContext);
