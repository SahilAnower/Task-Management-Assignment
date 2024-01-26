import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { showErrorToast, showSuccessToast } from "../errors/ErrorToast";
import { taskCreateApi } from "../api/Task";

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

function AddNewTask({ accessToken }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [task, setTask] = React.useState({
    title: "",
    description: "",
    dueDate: "",
    priority: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your logic to handle the form submission, e.g., make an API call
    try {
      const response = await taskCreateApi(
        {
          ...task,
          dueDate: new Date(task.dueDate),
        },
        accessToken
      );
      showSuccessToast("Task added successfully");
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: 1,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
    }
    console.log("Form Submitted:", task);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add New Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new task
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              name="title"
              value={task.title}
              onChange={handleChange}
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
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddNewTask;
