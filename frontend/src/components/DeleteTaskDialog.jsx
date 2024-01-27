import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteTaskApi } from "../api/Task";
import { showErrorToast, showSuccessToast } from "../errors/ErrorToast";

function DeleteTaskDialog({ accessToken, _id }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    handleClose();
    // Add your logic to handle the form submission, e.g., make an API call
    try {
      const response = await deleteTaskApi(accessToken, _id);
      showSuccessToast(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
    }
    console.log("Form Submitted:", response);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "error.main",
          color: "white",
          "&:hover": {
            bgcolor: "darkred", // Change to the desired dark red color
          },
        }}
      >
        DeleteTask
      </Button>

      {/* Delete confirmation dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteTaskDialog;
