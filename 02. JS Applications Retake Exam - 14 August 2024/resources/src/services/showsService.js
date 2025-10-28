import {get, post, put} from "../utils/api.js";
import {get, post, put, del} from "../utils/api.js";

export async function getAllShows() {
    const path = '/data/shows?sortBy=_createdOn%20desc';
    return get(path);
}

export async function getById(id) {
    const path = `/data/shows/${id}`;
    return get(path);
}

export async function createShow(data) {
    const path = `/data/shows`;
    return post(path, data);
}

export async function updateShow(id, data) {
    const path = `/data/drones/${id}`;
    return put(path, data);
export async function deleteShow(id) {
    const path = `/data/shows/${id}`;
    return await del(path);
}
}