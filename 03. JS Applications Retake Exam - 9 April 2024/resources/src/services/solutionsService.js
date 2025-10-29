import {get, post, put} from "../utils/api.js";

export async function getAllSolutions() {
    const path = '/data/solutions?sortBy=_createdOn%20desc';
    return await get(path);
}

export async function getById(id) {
    const path = `/data/solutions/${id}`;
    return await get(path);
}

export async function createSolution(data) {
    const path = `/data/solutions`;
    return await post(path, data);
}

export async function updateSolution(id, data) {
    const path = `/data/solutions/${id}`;
    return await put(path, data);
}