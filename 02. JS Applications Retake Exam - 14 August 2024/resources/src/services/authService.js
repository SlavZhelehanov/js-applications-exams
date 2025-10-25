import {setUserData} from "../utils/utils.js";
import {post} from "../utils/api.js";

export async function registerUser(email, password) {
    const user = await post("/users/register", {email, password});

    setUserData(user);
}