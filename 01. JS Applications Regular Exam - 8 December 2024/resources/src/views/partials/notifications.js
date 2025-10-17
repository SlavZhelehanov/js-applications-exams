const errorBox = document.getElementById('errorBox');
const msg = errorBox.getElementsByClassName('msg')[0];

export function notify(errMsg) {
    msg.textContent = errMsg;
    errorBox.style.display = 'inline-block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
}