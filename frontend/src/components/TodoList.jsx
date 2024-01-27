import * as React from "react";
import List from "@mui/material/List";
import { getTasksApi } from "../api/Task";
import { showErrorToast } from "../errors/ErrorToast";
import TaskItem from "./TaskItem";
import FilterList from "./FilterList";
import Box from "@mui/material/Box";

function TodoList({ accessToken }) {
  const [allTasks, setAllTasks] = React.useState([]);

  const [sortOrder, setSortOrder] = React.useState({
    completedOrder: null,
    createdAtOrder: null,
    dueDateOrder: null,
    priorityOrder: null,
  });

  const handleSortOrderChange = (orderType, order) => {
    setSortOrder((prevSortOrder) => ({
      completedOrder: null,
      createdAtOrder: null,
      dueDateOrder: null,
      priorityOrder: null,
      [orderType]: order,
    }));
    console.log(sortOrder);
  };

  React.useEffect(() => {
    async function getAllTasks() {
      try {
        const queryParams = {};
        if (sortOrder.completedOrder) {
          queryParams.completedSort = sortOrder.completedOrder;
        }
        if (sortOrder.createdAtOrder) {
          queryParams.createdAt = sortOrder.createdAtOrder;
        }
        if (sortOrder.dueDateOrder) {
          queryParams.dueDateSort = sortOrder.dueDateOrder;
        }
        if (sortOrder.priorityOrder) {
          queryParams.priority = sortOrder.priorityOrder;
        }
        const response = await getTasksApi(accessToken, queryParams);
        setAllTasks(response);
      } catch (error) {
        showErrorToast(error?.response?.data?.message);
      }
    }
    getAllTasks();
  }, [sortOrder]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <FilterList onSortOrderChange={handleSortOrderChange} />
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {allTasks.map((task) => (
          <TaskItem
            key={task._id}
            _id={task._id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            isCompleted={task.isCompleted}
            dueDate={task.dueDate}
            createdAt={task.createdAt}
            accessToken={accessToken}
          />
        ))}
      </List>
      {/* {`Sortorder: ${sortOrder.completedOrder}`} */}
    </Box>
  );
}

export default TodoList;
