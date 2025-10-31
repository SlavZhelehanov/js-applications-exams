const item = "userData";

export function saveUserData(data) { sessionStorage.setItem(item, JSON.stringify(data)); }

export function getUserData() { return JSON.parse(sessionStorage.getItem(item)); }

export function clearUserData() { sessionStorage.removeItem(item); }

export function setNavigation() {
    const isLoggedIn = getUserData();
    console.log("isLoggedIn: ", isLoggedIn)
    // const [_, divUser, divGuest] = document.getElementsByTagName('nav')[0].getElementsByTagName('div');
    const [_, authDiv] = document.getElementsByTagName('nav')[0].getElementsByTagName('div');
    const [a1, a2] = authDiv.getElementsByTagName('a');

    // isLoggedIn
    //     ? [divUser.style.display = 'inline-block', divGuest.style.display = "none"]
    //     : [divGuest.style.display = 'inline-block', divUser.style.display = "none"];
    isLoggedIn
        ? [authDiv.className = 'user', a1.href = '/addFruit', a2.href = '/logout', a1.textContent = 'Add Fruit', a2.textContent = 'Logout']
        : [authDiv.className = 'guest', a1.href = '/login', a2.href = '/register', a1.textContent = 'Login', a2.textContent = 'Register'];
}