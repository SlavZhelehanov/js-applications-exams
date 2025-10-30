import {saveUserData, clearUserData} from "../utils/utils.js";
import {post, get} from "../utils/api.js";

export async function registerUser(email, password) {
    const user = await post("/users/register", {email, password});

    if (399 < user.status) throw user.statusText;

    saveUserData(user);
}

export async function loginUser(email, password) {
    const user = await post("/users/login", {email, password});

    if (399 < user.status) throw user.statusText;

    saveUserData(user);
}

export async function logoutUser() {
    const result = await get("/users/logout");

    clearUserData();

    return result;
}