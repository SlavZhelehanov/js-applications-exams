import {html} from '../../../node_modules/lit-html/lit-html.js';
// import {createSubmitHandler} from '../../utils/utils.js';
import {registerUser} from '../../services/authService.js';

function registerTemplate(onRegister) {
    return html`
        <section id="register">
            <div class="form">
                <h2>Register</h2>
                <form class="register-form" @submit=${onRegister}>
                    <input
                            type="text"
                            name="email"
                            id="register-email"
                            placeholder="email"
                    />
                    <input
                            type="password"
                            name="password"
                            id="register-password"
                            placeholder="password"
                    />
                    <input
                            type="password"
                            name="re-password"
                            id="repeat-password"
                            placeholder="repeat password"
                    />
                    <button type="submit">register</button>
                    <p class="message">Already registered? <a href="/login">Login</a></p>
                </form>
            </div>
        </section>
    `;
}

export function registerPage(ctx) {
    // ctx.render(registerTemplate(createSubmitHandler(onRegister)));
    ctx.render(registerTemplate(onRegister));

    // async function onRegister({email, password,['re-password']: repass}, form) {
    //     if (email === '' || password === '') {
    //         return console.log('All fields are required');
    //     }
    //
    //     if (password !== repass) {
    //         return console.log("Passwords don't match");
    //     }
    //
    //     await registerUser(email, password);
    //     form.reset();
    //     ctx.page.redirect('/');
    // }
    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('re-password');

        if (email === '' || password === '') return alert('All fields are required');
        if (password !== repass) return alert("Passwords don't match");

        await registerUser(email, password);
        e.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}