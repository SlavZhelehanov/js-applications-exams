const item = "userData";

export function saveUserData(data) {
    sessionStorage.setItem(item, JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem(item));
}

export function clearUserData() {
    sessionStorage.removeItem(item);
}

export function setNavigation() {
    const isLoggedIn = getUserData();
    // const [_, divUser, divGuest] = document.getElementsByTagName('nav')[0].getElementsByTagName('div');
    const [_, authDiv] = document.getElementsByTagName('nav')[0].getElementsByTagName('div');
    const [a1, a2] = authDiv.getElementsByTagName('a');

    isLoggedIn
        ? [(authDiv.className = 'user'), (a1.textContent = 'Sell'), (a1.href = '/sell'), (a2.textContent = 'Logout'), (a2.href = '/logout')]
        : [(authDiv.className = 'guest'), (a1.textContent = 'Login'), (a1.href = '/login'), (a2.textContent = 'Register'), (a2.href = '/register')];
}

export function notify(errMsg) {
    const errorBox = document.getElementById('errorBox');
    const msg = errorBox.getElementsByClassName('msg')[0];

    msg.textContent = errMsg;
    errorBox.style.display = 'inline-block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
}