import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getTasksApi } from "../api/Task";
import { showErrorToast } from "../errors/ErrorToast";

function PendingTasksCard({ accessToken }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getCompletedTasks() {
      try {
        const queryParams = {
          isCompleted: false,
          count: 1,
        };
        const response = await getTasksApi(accessToken, queryParams);
        setCount(response[0]?.count);
      } catch (error) {
        showErrorToast(error?.response?.data?.message);
      }
    }
    getCompletedTasks();
  }, []);

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
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PendingTasksCard;
