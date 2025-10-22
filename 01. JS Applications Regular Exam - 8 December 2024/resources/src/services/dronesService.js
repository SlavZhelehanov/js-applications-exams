import {get} from "../data/api.js";

export async function getAllDrones() {
    const path = '/data/drones?sortBy=_createdOn%20desc';
    return get(path);
}