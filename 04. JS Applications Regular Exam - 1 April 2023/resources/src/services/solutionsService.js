import {get, post, put, del} from "../utils/api.js";

export async function getAllSolutions() {
    const path = '/data/fruits?sortBy=_createdOn%20desc';
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

export async function deleteSolution(id) {
    const path = `/data/solutions/${id}`;
    return await del(path);
}

export async function getLikes(solutionId) {
    const path = `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`;
    return await get(path);
}

export async function likeSolution(solutionId) {
    const path = `/data/likes`;
    return await post(path, {solutionId});
}

export async function getUserLikes(userId, solutionId) {
    const path = `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return await get(path);
}