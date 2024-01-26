import * as React from "react";
import List from "@mui/material/List";
import { getTasksApi } from "../api/Task";
import { showErrorToast } from "../errors/ErrorToast";
import TaskItem from "./TaskItem";

function TodoList({ accessToken }) {
  const [allTasks, setAllTasks] = React.useState([]);

  React.useEffect(() => {
    async function getAllTasks() {
      try {
        const response = await getTasksApi(accessToken);
        setAllTasks(response);
      } catch (error) {
        showErrorToast(error?.response?.data?.message);
      }
    }
    getAllTasks();
  }, []);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {allTasks.map((task) => (
        <TaskItem
          key={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          isCompleted={task.isCompleted}
          dueDate={task.dueDate}
          createdAt={task.createdAt}
        />
      ))}
    </List>
  );
}

export default TodoList;
