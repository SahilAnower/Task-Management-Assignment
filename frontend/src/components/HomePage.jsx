import React, { useEffect, useState } from "react";
import Container from "@mui/system/Container";
import Box from "@mui/material/Box";
import PieChart from "./PieChart";
import CompletedTasksCard from "./CompletedTasksCard";
import PendingTasksCard from "./PendingTasksCard";
import AddNewTask from "./AddNewTask";
import TodoList from "./TodoList";
import { useTaskManagementStore } from "../store/store";
import { getPieChartDataApi } from "../api/Task";
import { showErrorToast } from "../errors/ErrorToast";
import AccountMenu from "./AccountMenu";
import { refreshTokenApi } from "../api/SignupSigninForm";

function HomePage() {
  const accessToken = useTaskManagementStore((state) => state.accessToken);
  const refreshToken = useTaskManagementStore((state) => state.refreshToken);
  const setTokens = useTaskManagementStore((state) => state.setTokens);

  const [tasksCount, setTasksCount] = useState({
    completedTasksToday: 0,
    pendingTasksToday: 0,
    completedTasksAllTime: 0,
    pendingTasksAllTime: 0,
  });

  useEffect(() => {
    async function getTasksCount() {
      try {
        const response = await getPieChartDataApi(accessToken);
        setTasksCount(response);
      } catch (error) {
        showErrorToast(error?.response?.data?.message);
      }
    }
    getTasksCount();
  }, []);

  useEffect(() => {
    async function refreshAccessToken() {
      try {
        const response = await refreshTokenApi(refreshToken);
        setTokens(response?.accessToken, response?.refreshToken);
      } catch (error) {
        console.error("Error refreshing access token: ", error?.response?.data);
      }
    }
    const refreshInterval = setInterval(refreshAccessToken, 60 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [accessToken, refreshToken]);

  return (
    <Container maxWidth="xl">
      <AccountMenu />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 2,
          mt: 2,
          height: "40vh",
        }}
      >
        <PieChart tasksCount={tasksCount} />
        <CompletedTasksCard tasksCount={tasksCount} />
        <PendingTasksCard tasksCount={tasksCount} />
      </Box>
      <Box
        sx={{
          gap: 2,
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignContent: "space-evenly",
        }}
      >
        <AddNewTask accessToken={accessToken} />
        <TodoList accessToken={accessToken} />
      </Box>
    </Container>
  );
}

export default HomePage;
