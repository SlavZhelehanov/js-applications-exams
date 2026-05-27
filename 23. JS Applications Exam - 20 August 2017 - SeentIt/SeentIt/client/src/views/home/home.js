import { html } from "../../lib/lit-html.min.js";
import { getUserData, setIsRegister, saveUserData, calcTime, showNotification } from "../../utils/utils.js";
function welcome() {
    return html`
        <section id="viewWelcome">
            <div class="welcome">
                <div class="signup">
                    <form id="loginForm">
                        <h2>Sign In</h2>
                        <label>Username:</label>
                        <input name="username" type="text">
                        <label>Password:</label>
                        <input name="password" type="password">
                        <input id="btnLogin" value="Sign In" type="submit">
                    </form>
                    <form id="registerForm">
                        <h2>Register</h2>
                        <label>Username:</label>
                        <input name="username" type="text">
                        <label>Password:</label>
                        <input name="password" type="password">
                        <label>Repeat Password:</label>
                        <input name="repeatPass" type="password">
                        <input id="btnRegister" value="Sign Up" type="submit">
                    </form>
                </div>

                <div class="about">
                    <h1>Welcome to SeenIt</h1>
                    <p>
                        Share interesting links and discuss great content. It's what's happening now.
                    </p>
                    <p>Sign in or sign up in a second.</p>
                </div>
            </div>
        </section>`;
}

export async function homePage(ctx) {
    const isAuth = getUserData();

    if (isAuth) {
    } else {
        return ctx.render(welcome());
    }
}