import {setUserData, clearUserData} from "../utils/utils.js";
import {post} from "../data/api.js";

const endpoints = {
    register: 'users/register',
}

export async function registerUser(email, password) {
    const user = await post(endpoints.register, {email, password});

    setUserData(user);
}