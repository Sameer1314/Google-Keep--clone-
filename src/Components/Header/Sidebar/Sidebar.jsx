import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Drawer as MuiDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import NavList from "./NavList";
import { useThemeContext } from "../../Theme/ThemeContext";

const drawerWidth = 280;

// Open style
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  border: "none",
  marginTop: 10,
});

// Collapsed style
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
  border: "none",
  marginTop: 10,
});

// Top spacing for drawer content
const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

// Styled Drawer for desktop (mini variant)
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
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      color: theme.palette.text.primary,
    },
  }),
}));

// MAIN SIDEBAR COMPONENT
const Sidebar = ({ open, handleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode } = useThemeContext();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Navbar */}
      <Navbar open={open} handleDrawer={handleDrawer} />

      {isMobile ? (
        // Mobile: temporary overlay drawer
        <MuiDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawer}
          ModalProps={{ keepMounted: true }} // improves mobile performance
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              color: theme.palette.text.primary,
            },
          }}
        >
          <DrawerHeader />
          <NavList open={open} setOpen={handleDrawer} />
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
        </MuiDrawer>
      ) : (
        // Desktop: permanent drawer with collapsible style
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
      )}
    </Box>
  );
};

export default Sidebar;
