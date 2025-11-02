import {get, post, put, del} from "../utils/api.js";

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

export async function updateFruit(id, data) {
    const path = `/data/fruits/${id}`;
    return await put(path, data);
}

export async function deleteFruit(id) {
    const path = `/data/fruits/${id}`;
    return await del(path);
}

export async function searchFruit(query) {
    const path = `/data/fruits?where=name%20LIKE%20%22${query}%22`;
    return await get(path);
}