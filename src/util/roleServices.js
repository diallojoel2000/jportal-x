import { QueryClient } from "@tanstack/react-query";
import { getToken } from "./auth";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const queryClient = new QueryClient();

export const createRole = async (command) => {
  const response = await fetch(`${baseUrl}/Roles`, {
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

export const getAppRoles = async () => {
  let url = `${baseUrl}/Roles`;

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

  const appRoles = await response.json();
  return appRoles;
};

export const updateRoleMatrix = async (command) => {
  const response = await fetch(`${baseUrl}/Roles/updateRoleMatrix`, {
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
