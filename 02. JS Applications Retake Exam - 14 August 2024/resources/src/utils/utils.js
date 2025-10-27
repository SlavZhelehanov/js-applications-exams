const itemName = 'userData';

export function getUserData() {
    const userData = sessionStorage.getItem(itemName);

    if (!userData) return undefined;
    return JSON.parse(userData);
}

export function setUserData(userData) {
    sessionStorage.setItem(itemName, JSON.stringify(userData));
}

export function clearUserData() {
    sessionStorage.removeItem(itemName);
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

export function setPageNavigation() {
    const user = getUserData();
    const classUser = document.querySelector('.user');
    const classGuest = document.querySelector('.guest');
    console.log("user: ", user)
    user
        ? [
            (classUser.style.display = "inline-block"),
            (classGuest.style.display = "none"),
        ]
        : [
            (classUser.style.display = "none"),
            (classGuest.style.display = "inline-block"),
        ];
}