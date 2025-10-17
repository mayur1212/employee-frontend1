

// src/apollo/api.js

// Use deployed backend in production, fallback to localhost for dev
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://employee-backend-y5xe.onrender.com";

// REST helper example
export const getAllEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return await response.json();
};
