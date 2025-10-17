import {setUserData, clearUserData} from "../utils/utils.js";
import {post} from "../data/api.js";

const endpoints = {
    register: 'users/register',
    login: '/users/login',
}

export async function registerUser(email, password) {
    const user = await post(endpoints.register, {email, password});

    setUserData(user);
}

export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
    setUserData(result);
}