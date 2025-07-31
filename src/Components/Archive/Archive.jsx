import React, { useState, useContext } from "react";

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { UnarchiveOutlined, DeleteOutlineOutlined } from "@mui/icons-material";

import { DataContext } from "../../Context/DataProvider";

import { useTheme } from "@mui/material/styles";

const ArchiveCard = styled(Card)`
box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;

  width: 100%;
  max-width: 400px; /* Grows up to this max */
  min-height: 180px; /* Taller for better spacing */
  aspect-ratio: 4 / 3;

  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 5px 3px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 12px;
    min-height: 150px;`;

const Archive = ({ archiveNote }) => {
  const theme = useTheme();
  const iconTextColor = theme.palette.mode === "dark" ? "#9AA0A6" : "inherit";

  const [showActions, setShowActions] = useState(false);

  const { setNotes, archivedNotes, setArchivedNotes, setDeletedNotes } =
    useContext(DataContext);

  const unarchiveNote = (archiveNote) => {
    const updatedNotes = archivedNotes.filter(
      (data) => data.id !== archiveNote.id
    );
    setArchivedNotes(updatedNotes);
    setNotes((prevArr) => [...prevArr, archiveNote]);
  };

  const deleteNote = (archiveNote) => {
    const updatedNotes = archivedNotes.filter(
      (data) => data.id !== archiveNote.id
    );
    setArchivedNotes(updatedNotes);
    setDeletedNotes((prevArr) => [...prevArr, archiveNote]);
  };

  return (
    <ArchiveCard
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardContent sx={{ wordWrap: "break-word" }}>
        <Typography variant="h6" gutterBottom>
          {archiveNote.title}
        </Typography>
        <Typography variant="body2">{archiveNote.text}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}
      >
        <Tooltip title="Unarchive">
          <IconButton
            sx={{
              visibility: showActions ? "visible" : "hidden",
              color: iconTextColor,

              ":hover": { backgroundColor: "#5959592c" },
            }}
            onClick={() => unarchiveNote(archiveNote)}
          >
            <UnarchiveOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            sx={{
              visibility: showActions ? "visible" : "hidden",
              color: iconTextColor,

              ":hover": { backgroundColor: "#5959592c" },
            }}
            onClick={() => deleteNote(archiveNote)}
          >
            <DeleteOutlineOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </ArchiveCard>
  );
};

export default Archive;
