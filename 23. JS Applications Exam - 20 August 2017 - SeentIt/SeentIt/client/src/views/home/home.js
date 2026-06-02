import { html } from "../../lib/lit-html.min.js";
import { post, get } from "../../utils/api.js";
import { getUserData, setIsRegister, saveUserData, calcTime, showNotification } from "../../utils/utils.js";

function welcome({ onRegister }) {
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
                    <form id="registerForm" method="post" @submit=${onRegister}>
                        <h2>Register</h2>
                        <label>Username:</label>
                        <input name="register-username" type="text">
                        <label>Password:</label>
                        <input name="register-password" type="password">
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

function dashboard() {
    return html`<section id="viewCatalog">
            <div class="posts">
                <article class="post">
                    <div class="col rank">
                        <span>1</span>
                    </div>
                    <div class="col thumbnail">
                        <a href="https://softuni.bg/">
                            <img src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAMDAAAAJGY2Mjg3Y2I4LWU1ZTktNDJlNC1iM2M4LTc2MDlhNmVhNThhNQ.png">
                        </a>
                    </div>
                    <div class="post-content">
                        <div class="title">
                            <a href="https://softuni.bg/">
                                SoftUni
                            </a>
                        </div>
                        <div class="details">
                            <div class="info">
                                submitted 1 day ago by Kiril
                            </div>
                            <div class="controls">
                                <ul>
                                    <li class="action"><a class="commentsLink" href="#">comments</a></li>
                                    <li class="action"><a class="editLink" href="#">edit</a></li>
                                    <li class="action"><a class="deleteLink" href="#">delete</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </article>

                <article class="post">
                    <div class="col rank">
                        <span>2</span>
                    </div>
                    <div class="col thumbnail">
                        <a href="https://www.sli.do/">
                            <img src="https://www.sli.do/assets/images/2-step.png">
                        </a>
                    </div>
                    <div class="post-content">
                        <div class="title">
                            <a href="https://www.sli.do/">
                                Sli.Do
                            </a>
                        </div>
                        <div class="details">
                            <div class="info">
                                submitted 3 days ago by Viktor
                            </div>
                            <div class="controls">
                                <ul>
                                    <li class="action"><a class="commentsLink" href="#">comments</a></li>
                                    <li class="action"><a class="editLink" href="#">edit</a></li>
                                    <li class="action"><a class="deleteLink" href="#">delete</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </article>

                <article class="post">
                    <div class="col rank">
                        <span>3</span>
                    </div>
                    <div class="col thumbnail">
                        <a href="https://www.cnbc.com/2017/06/28/progress-buys-mobile-backend-start-up-kinvey-for-49-million.html">
                            <img src="https://pbs.twimg.com/profile_images/464099715865276417/nXvsGPVO.png">
                        </a>
                    </div>
                    <div class="post-content">
                        <div class="title">
                            <a href="https://www.cnbc.com/2017/06/28/progress-buys-mobile-backend-start-up-kinvey-for-49-million.html">
                                Progress Software buys Kinvey
                            </a>
                        </div>
                        <div class="details">
                            <div class="info">
                                submitted 4 hours ago by Nakov
                            </div>
                            <div class="controls">
                                <ul>
                                    <li class="action"><a class="commentsLink" href="#">comments</a></li>
                                    <li class="action"><a class="editLink" href="#">edit</a></li>
                                    <li class="action"><a class="deleteLink" href="#">delete</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </article>
                <!-- TODO: more posts will come here -->
            </div>
        </section>`;
}

export async function homePage(ctx) {
    const isAuth = getUserData();
    console.log(isAuth);
    

    if (isAuth) {
        return ctx.render(dashboard());
    } else {
        async function onRegister(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('register-username');
            const password = formData.get('register-password');
            const repass = formData.get('repeatPass');

            if (username === '' || password === '') return alert('All fields are required');
            if (password !== repass) return alert("Passwords don't match");

            try {
                const user = await post("/auth/register", { username, password });

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

        return ctx.render(welcome({ onRegister }));
    }
}