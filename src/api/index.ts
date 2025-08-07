import axios from "axios";
import type { Todo } from "../types/todo";
import { getAuth } from "firebase/auth";
import type { User } from "../types/user"; // Create this type if it doesn't exist

const API_BASE_URL = "http://localhost:5051/api";

const getAuthHeader = async () => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Todos-APIs
export const getTodos = async (): Promise<Todo[]> => {
  const config = await getAuthHeader();
  const res = await axios.get(`${API_BASE_URL}/todos`, config);
  console.log("api responce",res.data);
  return res.data;
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const config = await getAuthHeader();
  const res = await axios.post(`${API_BASE_URL}/todos`, todo, config);
  return res.data;
};

export const updateTodo = async (id: string, updatedFields: Partial<Todo>): Promise<Todo> => {
  const config = await getAuthHeader();
  const res = await axios.put(`${API_BASE_URL}/todos/${id}`, updatedFields, config);
  return res.data;
};

export const deleteTodo = async (id: string): Promise<{ message: string }> => {
  const config = await getAuthHeader();
  const res = await axios.delete(`${API_BASE_URL}/todos/${id}`, config);
  return res.data;
};


export const registerUser = async (token: string, email: string, role: string) => {
  
  return axios.post(
    `${API_BASE_URL}/users/register`,
    { email, role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchCurrentUser = async (token: string) => {
  const res = await axios.get(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Fetch all users (Super-admin only)
export const fetchAllUsers = async (): Promise<User[]> => {
  const config = await getAuthHeader();
  const res = await axios.get(`${API_BASE_URL}/sadmin/fetchAll`, config);
  return res.data;
};

// Assign role to a user (Super-admin only)
export const assignUserRole = async (uid: string, role: string): Promise<{ message: string }> => {
  const config = await getAuthHeader();
  const res = await axios.post(`${API_BASE_URL}/sadmin/updateRole`, { uid, role }, config);
  return res.data;
};