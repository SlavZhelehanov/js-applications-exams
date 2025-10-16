import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";
import {layoutPage} from "./views/layouts/main.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";

const wrapper = document.getElementById('wrapper');

page(decorateContext)
page("index.html", "/");
page("/", homePage);
page("/register", registerPage);
page("/login", loginPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    return next();
}

function renderView(content) {
    const userData = {};
    render(layoutPage(userData, content), wrapper);
}