const itemName = 'userData';

export function getUserData() {
    return JSON.parse(localStorage.getItem(itemName));
}

export function setUserData(userData) {
    localStorage.setItem(itemName, JSON.stringify(userData));
}

export function clearUserData() {
    localStorage.removeItem(itemName);
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        callback(data, form);
    }
}