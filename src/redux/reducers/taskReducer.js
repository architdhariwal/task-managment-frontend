import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasks: (state, action) => {
      return action.payload;
    },
    createTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task._id !== action.payload);
    },
  },
});

export const { fetchTasks, createTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
