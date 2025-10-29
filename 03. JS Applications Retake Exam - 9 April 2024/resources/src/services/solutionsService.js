import {get} from "../utils/api.js";

export async function getAllSolutions() {
    const path = '/data/solutions?sortBy=_createdOn%20desc';
    return await get(path);
}

export async function getById(id) {
    const path = `/data/solutions/${id}`;
    return await get(path);
}