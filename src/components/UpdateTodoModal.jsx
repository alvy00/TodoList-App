/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import toast from "react-hot-toast";

export function UpdateTodoModal({ open, handleClose, currentTodo, onUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title || "");
      setDescription(currentTodo.description || "");
      setDeadline(currentTodo.deadline?.slice(0, 16) || "");
      setPriority(currentTodo.priority || 0);
      setIsCompleted(currentTodo.is_completed || false);
    }
  }, [currentTodo]);

  const handleUpdate = () => {
    if (!title.trim()) {
      setTitleError(true);
      toast.error("Title is required");
      return;
    }

    const updatedTodo = {
      ...currentTodo,
      title,
      description,
      deadline: new Date(deadline).toISOString(),
      priority: Number(priority),
      is_completed: isCompleted,
    };

    onUpdate(updatedTodo);
    toast.success("Todo updated!");
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Update Todo</h2>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
          error={titleError}
          helperText={titleError ? "Title cannot be empty" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Priority (number)"
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
          }
          label="Completed"
          sx={{ mb: 2 }}
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
}
