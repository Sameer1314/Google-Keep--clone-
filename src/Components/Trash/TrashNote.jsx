import React, { useState, useContext } from "react";

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import {
  DeleteForeverOutlined,
  RestoreFromTrashOutlined,
} from "@mui/icons-material";

import { DataContext } from "../../Context/DataProvider";

import { useTheme } from "@mui/material/styles";

const TrashCard = styled(Card)`
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
    min-height: 150px;
`;

const TrashNote = ({ trashNote }) => {
  const theme = useTheme();
  const iconTextColor = theme.palette.mode === "dark" ? "#9AA0A6" : "inherit";

  const [showActions, setShowActions] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { setNotes, deletedNotes, setDeletedNotes } = useContext(DataContext);

  const deleteNote = (trashNote) => {
    const updatedNotes = deletedNotes.filter(
      (data) => data.id !== trashNote.id
    );
    setDeletedNotes(updatedNotes);
    handleCloseModal();
  };

  const restoreNote = (trashNote) => {
    const updatedNotes = deletedNotes.filter(
      (data) => data.id !== trashNote.id
    );
    setDeletedNotes(updatedNotes);
    setNotes((prevArr) => [...prevArr, trashNote]);
  };

  return (
    <React.Fragment>
      <TrashCard
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <CardContent sx={{ wordWrap: "break-word" }}>
          <Typography variant="h6" gutterBottom>
            {trashNote.title}
          </Typography>
          <Typography variant="body2">{trashNote.text}</Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Delete Forever">
            <IconButton
              sx={{
                visibility: showActions ? "visible" : "hidden",
                color: iconTextColor,
                ":hover": { backgroundColor: "#5959592c" },
              }}
              onClick={handleOpenModal}
            >
              <DeleteForeverOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restore">
            <IconButton
              sx={{
                visibility: showActions ? "visible" : "hidden",
                color: iconTextColor,
                ":hover": { backgroundColor: "#5959592c" },
              }}
              onClick={() => restoreNote(trashNote)}
            >
              <RestoreFromTrashOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </TrashCard>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          "& .MuiDialog-paper": {
            width: { xs: "300px", sm: "300px", md: "400px" },
            maxWidth: { sm: "50%", md: "70%", lg: "90%" },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: ".875rem", color: "#3c4043" }}>
          Delete note forever?
        </DialogTitle>
        <DialogActions>
          <Button variant="dark" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button onClick={() => deleteNote(trashNote)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TrashNote;
