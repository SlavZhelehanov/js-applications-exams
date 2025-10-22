import {get, del, post} from "../data/api.js";

export async function getAllDrones() {
    const path = '/data/drones?sortBy=_createdOn%20desc';
    return get(path);
}

export async function getById(id) {
    const path = `/data/drones/${id}`;
    return get(path);
}

export async function deleteDrone(id) {
    const path = `/data/drones/${id}`;
    return del(path);
}

export async function createDrone(data) {
    const path = `'/data/drones'`;
    return post(path, data);
}

export async function updateDrone(id, data) {
    return put(endpoints.byId + id, data);
}