import {get, post, del, put} from '../utils/api.js';

export function getAllDrones() {
    return get('/data/drones/?sortBy=_createdOn%20desc');
}

export function createDrone(data) {
    return post('/data/drones', data);
}

export function getOneDrone(id) {
    return get(`/data/drones/${id}`);
}

export function deleteDrone(id) {
    return del(`/data/drones/${id}`);
}

export function updateDrone(id, data) {
    return put(`/data/drones/${id}`, data);
}