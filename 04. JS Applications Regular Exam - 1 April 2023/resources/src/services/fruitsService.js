import {get} from "../utils/api.js";

export async function getAllFruits() {
    const path = '/data/fruits?sortBy=_createdOn%20desc';
    return await get(path);
}