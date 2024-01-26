import React from "react";
import Container from "@mui/system/Container";
import Box from "@mui/material/Box";
import PieChart from "./PieChart";
import CompletedTasksCard from "./CompletedTasksCard";
import PendingTasksCard from "./PendingTasksCard";
import AddNewTask from "./AddNewTask";
import TodoList from "./TodoList";

function HomePage() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Adjust as needed
          gap: 2, // Adjust the spacing between items
        }}
      >
        <PieChart />
        <CompletedTasksCard />
        <PendingTasksCard />
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
