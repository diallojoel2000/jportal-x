import { QueryClient } from "@tanstack/react-query";
import { getToken } from "./auth";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const queryClient = new QueryClient();

export const sendOtpCommand = async (command) => {
  const response = await fetch(`${baseUrl}/nin/sendotp`, {
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

export const syncDetailCommand = async (command) => {
  const response = await fetch(`${baseUrl}/nin/sync`, {
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

export const getNins = async (
  pageNumber,
  pageSize,
  search,
  startDate,
  endDate
) => {
  let url = `${baseUrl}/Nin?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (search) {
    url = `${url}&search=${search.trim()}`;
  }

  if (startDate && endDate) {
    url = `${url}&startDate=${startDate}&endDate=${endDate}`;
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
