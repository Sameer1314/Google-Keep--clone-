import React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import logo from "../../../Assets/Images/google-keep-logo.png";
import { useLocation } from "react-router-dom";
import { useThemeContext } from "../../Theme/ThemeContext";

// Styled AppBar with icons matching theme
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "inset 0 -1px 0 0 #dadce0",
}));

const Heading = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 22,
  paddingLeft: 15,
}));

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Header = ({ handleDrawer, open }) => {
  const location = useLocation();
  const pathName = capitalize(location.pathname.substring(1));
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton onClick={handleDrawer} edge="start" sx={{ marginRight: 5 }}>
          <MenuIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {!pathName && (
            <img src={logo} alt="logo" style={{ width: 30, marginRight: 8 }} />
          )}
          <Heading>{pathName || "Keep"}</Heading>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleColorMode}>
            {mode === "dark" ? (
              <Brightness7
                sx={{ color: (theme) => theme.palette.text.secondary }}
              />
            ) : (
              <Brightness4
                sx={{ color: (theme) => theme.palette.text.secondary }}
              />
            )}
          </IconButton>
          <Switch
            checked={mode === "dark"}
            onChange={toggleColorMode}
            inputProps={{ "aria-label": "toggle light/dark mode" }}
          />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
