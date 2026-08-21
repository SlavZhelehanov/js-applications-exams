import { html } from "../../lib/lit-html.min.js";
import { getUserData, saveUserData } from "../../utils/utils.js";
import { get, post } from "../../utils/api.js";

function template(onLogin) {
    return html`
        <div class="container auth">
            <form @submit=${onLogin}>
                <fieldset>
                    <legend>Login</legend>
                    <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                        increase in quantity and, hopefully, in value</blockquote>
                    <p class="field email">
                        <input type="email" id="email" name="email" placeholder="maria@email.com">
                        <label for="email">Email:</label>
                    </p>
                    <p class="field password">
                        <input type="password" id="login-pass" name="password">
                        <label for="login-pass">Password:</label>
                    </p>
                    <p class="field submit">
                        <button class="btn submit" type="submit">Log In</button>
                    </p>
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </div>`;
}

function dashboard({ js, cs, jv, py }) {
    return html`
        <div class="content">
            <section class="js">
                <h2>JavaScript</h2>
                <div class="articles">
                    ${0 < js.length
            ? js.map(artcl => html`<article>
                        <h3>${artcl.title}</h3>
                        <p>${artcl.content}</p>
                        <a href=/${artcl.articleId}/details class="btn details-btn">Details</a>
                    </article>`)
            : html`<h3 class="no-articles">No articles yet</h3>`
        }
                </div>
            </section>
            <section class="CSharp">
                <h2>C#</h2>
                <div class="articles">
                    ${0 < cs.length
            ? cs.map(artcl => html`<article>
                        <h3>${artcl.title}</h3>
                        <p>${artcl.content}</p>
                        <a href=/${artcl.articleId}/details class="btn details-btn">Details</a>
                    </article>`)
            : html`<h3 class="no-articles">No articles yet</h3>`
        }
                </div>
            </section>
            <section class="Java">
                <h2>Java</h2>
                <div class="articles">
                    ${0 < jv.length
            ? jv.map(artcl => html`<article>
                        <h3>${artcl.title}</h3>
                        <p>${artcl.content}</p>
                        <a href=/${artcl.articleId}/details class="btn details-btn">Details</a>
                    </article>`)
            : html`<h3 class="no-articles">No articles yet</h3>`
        }
                </div>
            </section>
            <section class="Pyton">
                <h2>Pyton</h2>
                <div class="articles">
                    ${0 < py.length
            ? py.map(artcl => html`<article>
                        <h3>${artcl.title}</h3>
                        <p>${artcl.content}</p>
                        <a href=/${artcl.articleId}/details class="btn details-btn">Details</a>
                    </article>`)
            : html`<h3 class="no-articles">No articles yet</h3>`
        }
                </div>
            </section>
        </div>`;
}

export async function homePage(ctx) {
    const isAuth = getUserData();

    if (isAuth) {
        let data = [], js = [], cs = [], jv = [], py = [];

        try {
            data = await get(`/app`);

            if (data && 0 < data.length) {
                for (const article of data) {
                    switch (article.category) {
                        case "JavaScript": {
                            js.push(article);
                            break;
                        }
                        case "C#": {
                            cs.push(article);
                            break;
                        }
                        case "Java": {
                            jv.push(article);
                            break;
                        }
                        case "Python": {
                            py.push(article);
                            break;
                        }
                        default: { break; }
                    }
                }
            }
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
        return ctx.render(dashboard({ js, cs, jv, py }));
    }

    async function onLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email.trim() === '' || password.trim() === '') return alert('All fields are required!');

        try {
            const user = await post("/auth/login", { email, password });

            if (399 < user.status) throw user.statusText;

            saveUserData(user);
            e.target.reset();
            ctx.setNavigation();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    ctx.render(template(onLogin));
}

// const isAuth = getUserData();
// let data = [];

// if (isAuth) {
//     try {
//         data = await get("/app");
//     } catch (err) {
//         if (err.message) alert(err.message);
//         else alert(err);
//     }

//     ctx.render(dashboard(data));
// } else {
//     ctx.render(template());
// }