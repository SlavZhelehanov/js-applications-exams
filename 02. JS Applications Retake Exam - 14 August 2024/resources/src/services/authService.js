import {setUserData, clearUserData} from "../utils/utils.js";
import {post, get} from "../utils/api.js";

export async function registerUser(email, password) {
    const user = await post("/users/register", {email, password});

    setUserData(user);
}

export async function login(email, password) {
    const result = await post("/users/login", {email, password});

    setUserData(result);
}

export async function logout() {
    get("/users/logout");
    clearUserData();
}