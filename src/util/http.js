import { QueryClient } from "@tanstack/react-query";
import { getToken } from "./auth";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const queryClient = new QueryClient();

export async function login(command) {
  const response = await fetch(`${baseUrl}/Authentication/Login`, {
    method: "POST",
    body: JSON.stringify(command),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    const errors = Object.values(data.errors).flat();
    console.log(errors);
    return response;
    //throw new Error(data.title);
  }

  return data;
}

export const refreshToken = async () => {
  const token = getToken();

  const error = new Error("An error occured");
  error.code = 401;

  if (token === null || token === undefined) {
    error.info = "Token is not available";
    throw error;
  } else {
    const response = await fetch(`${baseUrl}/Authentication/RefreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const token = responseData.result.token;
    localStorage.setItem("token", token);
    return token;
  }
};

export const fetchUsers = async (pageNumber, pageSize, search) => {
  let url = `${baseUrl}/Users?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (search) {
    url = `${url}&search=${search.trim()}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    const error = new Error("An error occured");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const users = await response.json();
  return users;
};

export const createUser = async (command) => {
  const response = await fetch(`${baseUrl}/Users`, {
    method: "POST",
    body: JSON.stringify(command),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error("An error occured");
    error.code = response.status;
    error.info = responseData;
    throw error;
  }

  return responseData;
};

export const getRoleMatrix = async () => {
  let url = `${baseUrl}/Roles/GetRoleMatrix`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    const error = new Error("An error occured");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const roleMatrix = await response.json();
  return roleMatrix;
};
