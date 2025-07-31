// src/App.js
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, styled } from "@mui/material";

import ThemeProvider from "./Components/Theme/ThemeContext";
import Sidebar from "./Components/Header/Sidebar/Sidebar";
import Notes from "./Components/Notes/Notes";
import Archive from "./Components/Archive/Archives";
import Trash from "./Components/Trash/TrashNotes";

// ensures content sits below AppBar
const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function App() {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <Router>
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* Sidebar with drawer state */}
          <Sidebar open={open} handleDrawer={handleDrawer} />

          {/* Main content area */}
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<Notes />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/trash" element={<Trash />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
