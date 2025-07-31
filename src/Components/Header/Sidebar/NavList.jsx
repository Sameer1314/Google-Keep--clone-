import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  LightbulbOutlined,
  ArchiveOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

const NavList = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const sidebarLinks = [
    { id: 1, label: "Notes", icon: <LightbulbOutlined />, link: "/" },
    { id: 2, label: "Archive", icon: <ArchiveOutlined />, link: "/archive" },
    { id: 3, label: "Trash", icon: <DeleteOutlineOutlined />, link: "/trash" },
  ];

  const handleDrawer = () => setOpen(true);

  const activeBgColor = theme.palette.mode === "dark" ? "#41331C" : "#fee540a6";
  const hoverBgColor = theme.palette.mode === "dark" ? "#2A2014" : "#7474741e";
  const iconTextColor = theme.palette.mode === "dark" ? "#9AA0A6" : "inherit";

  return (
    <List>
      {sidebarLinks.map((item) => {
        const isActive = location.pathname === item.link;

        return (
          <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={isActive}
              onClick={() => {
                navigate(item.link);
                handleDrawer();
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "0 50px 50px 0",
                backgroundColor: isActive ? activeBgColor : "inherit",
                "&.Mui-selected": {
                  backgroundColor: activeBgColor,
                  "&:hover": {
                    backgroundColor: activeBgColor, // disable hover on selected
                  },
                },
                "&:hover": {
                  backgroundColor: isActive ? activeBgColor : hoverBgColor,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: iconTextColor,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: open ? 1 : 0,
                  color: iconTextColor,
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default NavList;
