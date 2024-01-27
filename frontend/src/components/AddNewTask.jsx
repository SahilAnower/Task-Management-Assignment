import * as React from "react";
import Button from "@mui/material/Button";
import { showErrorToast, showSuccessToast } from "../errors/ErrorToast";
import { taskCreateApi } from "../api/Task";
import TaskModal from "./TaskModal";

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
      <TaskModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        task={task}
        isAddTask={true}
      />
    </div>
  );
}

export default AddNewTask;
