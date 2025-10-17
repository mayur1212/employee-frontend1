// src/apollo/api.js

// This will automatically pick the correct URL based on environment
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// REST helper example
export const getAllEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return await response.json();
};
