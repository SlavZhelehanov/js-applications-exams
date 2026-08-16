import {getUserData} from "./utils.js";

const URL = 'http://localhost:5050';

async function request(method, url, data) {
    const options = {method, headers: {}};
    const userData = getUserData();

    if (userData) {
        // options.headers['x-authorization'] = userData['accessToken'];
        options.headers['x-authorization'] = userData['token'];
    }
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(URL + url, options);

        if (response.ok === false) {
            throw await response.json();
        }
        try {
            return await response.json();
        } catch (err) {
            return response;
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
export const put = request.bind(null, 'put');
export const patch = request.bind(null, 'patch');
export const del = request.bind(null, "delete");