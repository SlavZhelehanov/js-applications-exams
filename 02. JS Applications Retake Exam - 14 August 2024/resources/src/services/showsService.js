import {get, post} from "../utils/api.js";

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