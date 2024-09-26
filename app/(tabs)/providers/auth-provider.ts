import { AuthProvider } from "@refinedev/core";

const BASE_URL = "http://localhost:5000";
const TOKEN_KEY = "access_token";

export const authProvider: AuthProvider = {
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return { success: true };
    },
    login: async ({ username, password }) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data.access_token)
        if (data.access_token) {
            localStorage.setItem(TOKEN_KEY, data.access_token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        return { authenticated: Boolean(token) };
    },
    onError: async (error) => { throw new Error("Not implemented"); },
    register: async (params) => {
        const { email, password } = params;
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.success) {
            return { success: true };
        }

        return { success: false };
    },
    forgotPassword: async (params) => {
        throw new Error("Not implemented");
    },
    updatePassword: async (params) => {
        throw new Error("Not implemented");
    },
    getIdentity: async ({ username, password }) => {
        const identityObject = {
            name: "misbah",
            age: 25,
            isAdmin: false
        };
        console.log("ini")
        console.log(username)
        const jsonString = JSON.stringify(identityObject);
        return JSON.parse(jsonString);
    },
    getPermissions: async () => {
        throw new Error("Not implemented");
    },
};
