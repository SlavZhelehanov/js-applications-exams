import {getUserData} from "./utils.js";

const URL = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {method, headers: {}};
    const userData = getUserData();

    if (userData) {
        options.headers['x-authorization'] = userData['accessToken'];
    }
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(URL + url, options);

        if (response.ok === false) {
            const error = await response.json();
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