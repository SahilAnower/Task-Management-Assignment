import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

function TaskModal({
  open,
  handleClose,
  handleSubmit,
  handleChange,
  task,
  isAddTask,
  handleIsCompleted,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isAddTask ? "Add new task" : "Update task"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            value={task.title}
            onChange={handleChange}
            error={!task.title}
            helperText={!task.title ? "Title is required" : ""}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            margin="dense"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            error={!task.dueDate}
            helperText={!task.dueDate ? "Due Date is required" : ""}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel
              id="priority-label"
              shrink={true}
              sx={{
                mb: 5,
              }}
            >
              Priority
            </InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </FormControl>
          {!isAddTask && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={task.isCompleted}
                  onChange={handleIsCompleted}
                  name="isCompleted"
                />
              }
              label="isCompleted?"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!task.title || !task.dueDate}
          >
            {isAddTask ? "Add" : "Update"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default TaskModal;
