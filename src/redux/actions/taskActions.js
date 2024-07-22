import axios from "axios";
import { fetchTasks as fetchTasksAction, createTask as createTaskAction, updateTask as updateTaskAction, deleteTask as deleteTaskAction } from '../reducers/taskReducer';

const API_URL = "http://localhost:5000/api";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const fetchTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/tasks`, config);
    dispatch(fetchTasksAction(res.data));
    return res.data;
  } catch (error) {
    console.error("Fetch tasks error:", error);
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/tasks`, taskData, config);
    dispatch(createTaskAction(res.data));
    return res.data;
  } catch (error) {
    console.error("Create task error:", error);
  }
};

export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, config);
    dispatch(updateTaskAction(res.data));
    return res.data;
  } catch (error) {
    console.error("Update task error:", error);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, config);
    dispatch(deleteTaskAction(taskId));
    return taskId;
  } catch (error) {
    console.error("Delete task error:", error);
  }
};
