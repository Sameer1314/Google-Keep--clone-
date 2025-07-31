import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer as MuiDrawer, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import NavList from "./NavList";
import { useThemeContext } from "../../Theme/ThemeContext";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  marginTop: 10,
  border: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  marginTop: 10,
  border: "none",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  color: theme.palette.text.primary,
  "& .MuiSvgIcon-root": {
    color: theme.palette.mode === "dark" ? "#9AA0A6" : "inherit",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      color: theme.palette.text.primary,
      "& .MuiSvgIcon-root": {
        color: theme.palette.mode === "dark" ? "#9AA0A6" : "inherit",
      },
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      color: theme.palette.text.primary,
      "& .MuiSvgIcon-root": {
        color: theme.palette.mode === "dark" ? "#9AA0A6" : "inherit",
      },
    },
  }),
}));

// Receive open state and handler from parent (App.js)
const Sidebar = ({ open, handleDrawer }) => {
  const { mode } = useThemeContext();

  return (
    <Box sx={{ display: "flex" }}>
      {/* App bar with theme toggle and menu button */}
      <Navbar open={open} handleDrawer={handleDrawer} />

      {/* Persistent drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <NavList open={open} setOpen={handleDrawer} />

        {open && (
          <Box
            sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 2 }}
          >
            <Typography variant="body2" color="textSecondary">
              Created by:{" "}
              <Link
                underline="hover"
                href="https://github.com/Sameer1314"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sameer Shivgan
              </Link>
            </Typography>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
