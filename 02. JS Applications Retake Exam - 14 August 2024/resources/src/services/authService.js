import {setUserData, clearUserData} from "../utils/utils.js";
import {post, get} from "../utils/api.js";

export async function registerUser(email, password) {
    try {
        const user = await post("/users/register", {email, password});

        if(399 < user.code) throw user.message;

        setUserData(user);
    } catch (error) {
        throw error; // Re-throw to let caller handle it
    }
}

export async function login(email, password) {
    try {
        const user = await post("/users/login", {email, password});

        if(399 < user.code) throw user.message;

        setUserData(user);
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        await get("/users/logout");
        clearUserData();
    } catch (error) {
        console.error("Logout failed:", error);
        // Still clear local data even if server request fails
        clearUserData();
    }
}