import React, { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

function FilterList({ onSortOrderChange }) {
  const [orderMenuItem, setOrderMenuItem] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  const handleSortOrderChange = (orderValue) => {
    setSortOrder(orderValue);
    onSortOrderChange(orderMenuItem, orderValue);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      gap={2}
    >
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="menuItemSelect">Sort By</InputLabel>
          <Select
            value={orderMenuItem}
            onChange={(e) => setOrderMenuItem(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            labelId="menuItemSelect"
            label="Sort By"
          >
            {/* <MenuItem value="">----</MenuItem> */}
            <MenuItem value="createdAtOrder">Created At</MenuItem>
            <MenuItem value="dueDateOrder">Due Date</MenuItem>
            <MenuItem value="priorityOrder">Priority</MenuItem>
            <MenuItem value="completedOrder">Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Dropdown for sorting order (asc, desc, null) */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="orderItemSelect">Order By</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => handleSortOrderChange(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            labelId="orderItemSelect"
            label="Order By"
          >
            {/* <MenuItem value="">----</MenuItem> */}
            <MenuItem value="1">Ascending</MenuItem>
            <MenuItem value="-1">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default FilterList;
