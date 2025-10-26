import {get} from "../utils/api.js";

export async function getAllShows() {
    const path = '/data/shows?sortBy=_createdOn%20desc';
    return get(path);
}