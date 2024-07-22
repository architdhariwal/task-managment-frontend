import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT } from "./types";

const API_URL = process.env.REACT_APP_API_URL;

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, userData);
    return res.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const googleLogin = (credential) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/auth/google-login`, {
      credential,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

export const googleSignup = (credential) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/auth/google-signup`, {
      credential,
    });
    return res.data;
  } catch (error) {
    console.error("Google signup error:", error);
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};