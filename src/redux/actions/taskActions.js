import axios from "axios";
import { fetchTasks as fetchTasksAction, createTask as createTaskAction, updateTask as updateTaskAction, deleteTask as deleteTaskAction } from '../reducers/taskReducer';

const API_URL = "https://task-management-backend-rc2q.onrender.com/api";

const getConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    checkToken();
    const res = await axios.get(`${API_URL}/tasks`, getConfig());
    dispatch(fetchTasksAction(res.data));
    return res.data;
  } catch (error) {
    console.error("Fetch tasks error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    checkToken();
    const res = await axios.post(`${API_URL}/tasks`, taskData, getConfig());
    dispatch(createTaskAction(res.data));
    return res.data;
  } catch (error) {
    console.error("Create task error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    checkToken();
    const res = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, getConfig());
    dispatch(updateTaskAction(res.data));
    return res.data;
  } catch (error) {
    console.error("Update task error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    checkToken();
    await axios.delete(`${API_URL}/tasks/${taskId}`, getConfig());
    dispatch(deleteTaskAction(taskId));
    return taskId;
  } catch (error) {
    console.error("Delete task error:", error.response ? error.response.data : error.message);
    throw error;
  }
};