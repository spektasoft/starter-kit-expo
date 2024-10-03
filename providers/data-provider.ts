import type { DataProvider } from "@refinedev/core";
process.env.REACT_APP_DEV_MODE
const host=process.env.EXPO_PUBLIC_HOSTS
const port=process.env.EXPO_PUBLIC_PORT
const API_URL = "http://${host}:${port}";
export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    });
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return response.json();
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(variables),
    });
    if (!response.ok) {
      throw new Error("Error updating data");
    }
    return response.json();
  },
  getList: async ({ resource }) => {
    
    const response = await fetch(`${API_URL}/${resource}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    });
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data =await response.json();
    const total = Number(response.headers.get("x-total-count"));
    return {data, total};
  },
  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(variables),
    });
    if (!response.ok) {
      throw new Error("Error creating data");
    }
    return response.json();
  },
  deleteOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    });
    if (!response.ok) {
      throw new Error("Error deleting data");
    }
    return response.json();
  },
  getApiUrl: () => API_URL,
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },
};
