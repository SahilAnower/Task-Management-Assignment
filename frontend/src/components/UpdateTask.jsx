import * as React from "react";
import Button from "@mui/material/Button";
import { showErrorToast, showSuccessToast } from "../errors/ErrorToast";
import { updateTaskApi } from "../api/Task";
import TaskModal from "./TaskModal";

function UpdateTask({ accessToken, task }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedTask, setUpdatedTask] = React.useState(task);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your logic to handle the form submission, e.g., make an API call
    try {
      const response = await updateTaskApi(
        accessToken,
        updatedTask,
        updatedTask._id
      );
      showSuccessToast("Task updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
    }
    console.log("Form Submitted:", updatedTask);
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
        UpdateTask
      </Button>
      <TaskModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        task={updatedTask}
        isAddTask={false}
      />
    </div>
  );
}

export default UpdateTask;
