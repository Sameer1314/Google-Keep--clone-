import React, { useState, useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  TextField,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ArchiveOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const NoteCard = styled(Card)`
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  min-height: 180px;
  aspect-ratio: 4 / 3;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 5px 3px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 12px;
    min-height: 150px;
  }
`;

const Note = ({ note }) => {
  const theme = useTheme();
  const iconTextColor = theme.palette.mode === "dark" ? "#9AA0A6" : "inherit";

  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedText, setEditedText] = useState(note.text);

  const { notes, setNotes, setArchivedNotes, setDeletedNotes } =
    useContext(DataContext);

  const archiveNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setArchivedNotes((prevArr) => [...prevArr, note]);
  };

  const deleteNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setDeletedNotes((prevArr) => [...prevArr, note]);
  };

  const saveEdits = () => {
    const updatedNote = { ...note, title: editedTitle, text: editedText };
    const updatedNotes = notes.map((n) => (n.id === note.id ? updatedNote : n));
    setNotes(updatedNotes);
    setIsEditing(false);
  };

  return (
    <NoteCard
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => setIsEditing(true)}
    >
      <CardContent sx={{ wordWrap: "break-word" }}>
        {isEditing ? (
          <>
            <TextField
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={saveEdits}
              variant="standard"
              fullWidth
              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
            />
            <TextField
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={saveEdits}
              variant="standard"
              fullWidth
              multiline
              sx={{ marginTop: 1 }}
            />
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {note.title}
            </Typography>
            <Typography variant="body2">{note.text}</Typography>
          </>
        )}
      </CardContent>

      <CardActions
        sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}
      >
        <Tooltip title="Archive">
          <IconButton
            sx={{
              visibility: showActions ? "visible" : "hidden",
              color: iconTextColor,
              ":hover": { backgroundColor: "#5959592c" },
            }}
            onClick={(e) => {
              e.stopPropagation();
              archiveNote(note);
            }}
          >
            <ArchiveOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            sx={{
              visibility: showActions ? "visible" : "hidden",
              color: iconTextColor,
              ":hover": { backgroundColor: "#5959592c" },
            }}
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note);
            }}
          >
            <DeleteOutlineOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </NoteCard>
  );
};

export default Note;
