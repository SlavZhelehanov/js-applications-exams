import {get, post} from "../utils/api.js";

export async function getAllFruits() {
    const path = '/data/fruits?sortBy=_createdOn%20desc';
    return await get(path);
}

export async function createFruit(data) {
    const path = `/data/fruits`;
    return await post(path, data);
}

export async function getById(id) {
    const path = `/data/fruits/${id}`;
    return await get(path);
}