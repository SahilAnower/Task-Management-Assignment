import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TaskItem({
  title,
  description,
  priority,
  isCompleted,
  dueDate,
  createdAt,
}) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>{title[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {description}
              </Typography>
              <br />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignContent="center"
                gap={2}
              >
                <Typography variant="body2" color="text.secondary">
                  Priority:{" "}
                  {(() => {
                    switch (priority) {
                      case 1:
                        return "Low";
                      case 2:
                        return "Medium";
                      case 3:
                        return "High";
                      default:
                        return "";
                    }
                  })()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed: {isCompleted ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due Date: {dueDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created At: {createdAt}
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default TaskItem;
