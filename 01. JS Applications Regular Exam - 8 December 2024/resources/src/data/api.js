import {getUserData, clearUserData} from "../utils/utils.js";
const URL = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {method, headers: {}};
    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData['accessToken'];
    }
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(URL + url, options);
        let result;

        if(response.status !== 204) result = await response.json();
        if(response.ok === false && response.status === 403) clearUserData();
        if(response.ok === false && response.status !== 403) throw result;
        return result;
    } catch (error) {throw error;}
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
