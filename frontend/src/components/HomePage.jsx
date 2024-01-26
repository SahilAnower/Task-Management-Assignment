import React, { useState } from "react";
import Container from "@mui/system/Container";
import Box from "@mui/material/Box";
import PieChart from "./PieChart";
import CompletedTasksCard from "./CompletedTasksCard";
import PendingTasksCard from "./PendingTasksCard";
import AddNewTask from "./AddNewTask";
import TodoList from "./TodoList";
import { useTaskManagementStore } from "../store/store";

function HomePage() {
  const accessToken = useTaskManagementStore((state) => state.accessToken);
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 2,
        }}
      >
        <PieChart />
        <CompletedTasksCard accessToken={accessToken} />
        <PendingTasksCard accessToken={accessToken} />
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
        <AddNewTask />
        <TodoList />
      </Box>
    </Container>
  );
}

export default HomePage;
