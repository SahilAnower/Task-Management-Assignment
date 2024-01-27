import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function PendingTasksCard({ tasksCount }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Pending Tasks
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          display="flex"
          justifyContent="center"
          alignContent="center"
          mt={2}
        >
          {tasksCount?.pendingTasksAllTime}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PendingTasksCard;
