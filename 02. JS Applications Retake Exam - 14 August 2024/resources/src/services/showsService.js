import {get, post, put, del} from "../utils/api.js";

export async function getAllShows() {
    const path = '/data/shows?sortBy=_createdOn%20desc';
    return await get(path);
}

export async function getById(id) {
    const path = `/data/shows/${id}`;
    return await get(path);
}

export async function createShow(data) {
    const path = `/data/shows`;
    return await post(path, data);
}

export async function updateShow(id, data) {
    const path = `/data/shows/${id}`;
    return await put(path, data);
}

export async function deleteShow(id) {
    const path = `/data/shows/${id}`;
    return await del(path);
}

export async function searchShow(query) {
    const path = `/data/shows?where=title%20LIKE%20%22${query}%22`;
    return await get(path);
}