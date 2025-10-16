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