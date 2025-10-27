import {setUserData, clearUserData} from "../utils/utils.js";
import {post, get} from "../utils/api.js";

export async function registerUser(email, password) {
    const user = await post("/users/register", {email, password});
    console.log(user)
    if (399 < user.code) throw user.message;

    setUserData(user);
}

export async function login(email, password) {
    const user = await post("/users/login", {email, password});

    if (399 < user.code) throw user.message;

    setUserData(user);
}

export async function logout() {
    const result = await get("/users/logout");
    clearUserData();

    return result;
}