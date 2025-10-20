import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";
import {getUserData} from "./utils/utils.js";
import {layoutPage} from "./views/layouts/main.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {logoutAction} from "./views/auth/logout.js";
import {dashboardPage} from "./views/drones/dashboard.js";
import {detailsPage} from "./views/drones/details.js";
import {editPage} from "./views/drones/edit.js";

const wrapper = document.getElementById('wrapper');

page(decorateContext)
page("/index.html", "/");
page("/", homePage);
page("/register", registerPage);
page("/login", loginPage);
page("/logout", logoutAction);
page("/catalog", dashboardPage);
page('/catalog/:id', detailsPage);
page('/catalog/:id/edit', editPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(content) {
    const userData = getUserData();

    render(layoutPage(userData, content), wrapper);
}