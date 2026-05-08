import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { getUserData, setIsRegister, saveUserData } from "../../utils/utils.js";

function register({ switchPage, onRegister }) {
    return html`
        <section id="viewRegister">
        <div class="content">
            <form class="form" id="formRegister" method="post" @submit=${onRegister}>
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <label>Repeat Password</label>
                <input name="repeatPass" type="password">
                <input id="btnRegister" value="Register" type="submit">
                <a @click=${() => switchPage('login')} href="javascript:void(0)">Log in</a>
            </form>
        </div>
    </section>`;
}

function login({ switchPage }) {
    return html`<section id="viewLogin">
        <div class="content">
            <form id="formLogin" class="form">
                <label>Username</label>
                <input name="username" type="text">
                <label>Password</label>
                <input name="password" type="password">
                <input id="btnLogin" value="Sign In" type="submit">
                <a @click=${() => switchPage('register')} href="javascript:void(0)">Register</a>
            </form>
        </div>
    </section>`;
}

export async function homePage(ctx) {
    const isAuth = getUserData();

    function switchPage(params) {
        if (params === 'login') {
            setIsRegister(false);
            return ctx.page.redirect('/');
        }
        setIsRegister(true);
        return ctx.page.redirect('/');
    }
    } else if (ctx.isRegister) {
        async function onRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username').trim();
            // const gender = formData.get('gender').trim();
            // const email = formData.get('email').trim();
            const password = formData.get('password').trim();
            const repass = formData.get('repeatPass').trim();

            if (username === '' || password === '') return alert('All fields are required');
            if (password !== repass) return alert("Passwords don't match");

            try {
                const res = await post("/auth/register", { username, password });
                console.log(res);


                if (399 < res.status) throw res.statusText;

                saveUserData(res.user);
                e.target.reset();
                ctx.setNavigation();
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }

        return ctx.render(register({ switchPage, onRegister }));
    } else {
        return ctx.render(login({ switchPage }));
    }
}