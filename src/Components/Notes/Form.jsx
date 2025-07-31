import React, { useState, useRef, useContext } from "react";
import {
  Box,
  Container as MuiContainer,
  ClickAwayListener,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../Context/DataProvider";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin: auto;
  margin-bottom: 2rem;
  min-height: 30px;
`;

const note = {
  id: "",
  title: "",
  text: "",
};

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const { setNotes } = useContext(DataContext);

  const containerRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();

  const onTextChange = (e) => {
    const changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };

  const handleKeyDown = (e, field) => {
    if (field === "title") {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        textRef.current?.focus();
      }
    }

    if (field === "text" && e.key === "ArrowUp" && showTextField) {
      e.preventDefault();
      titleRef.current?.focus();
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowTextField(false);
        containerRef.current.style.minHeight = "30px";
        if (addNote.title || addNote.text) {
          setNotes((prevArr) => [addNote, ...prevArr]);
        }
        setAddNote({ ...note, id: uuid() });
      }}
    >
      <MuiContainer maxWidth="sm">
        <Container ref={containerRef}>
          {showTextField && (
            <TextField
              inputRef={titleRef}
              size="medium"
              placeholder="Title"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              style={{ marginBottom: 10 }}
              onChange={onTextChange}
              name="title"
              value={addNote.title}
              onKeyDown={(e) => handleKeyDown(e, "title")}
            />
          )}
          <TextField
            inputRef={textRef}
            multiline
            placeholder="Take a note..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onClick={() => {
              setShowTextField(true);
              containerRef.current.style.minHeight = "70px";
            }}
            onChange={onTextChange}
            name="text"
            value={addNote.text}
            onKeyDown={(e) => handleKeyDown(e, "text")}
          />
        </Container>
      </MuiContainer>
    </ClickAwayListener>
  );
};

export default Form;
