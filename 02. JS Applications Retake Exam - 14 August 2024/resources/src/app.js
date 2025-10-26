import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";
import {getUserData} from "./utils/utils.js";
import {layoutPage} from "./views/layouts/main.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {logoutAction} from "./views/auth/logout.js";
import {dashboardPage} from "./views/shows/dashboard.js";

const wrapper = document.getElementById('wrapper');

function renderView(content) {
    const userData = getUserData();

    render(layoutPage(userData, content), wrapper);
}

function decorateContext(ctx, next) {
    ctx.render = renderView;
    ctx.page = page;
    next();
}

// Authentication guard middleware
function requireAuth(ctx, next) {
    const userData = getUserData();
    if (!userData) {
        page.redirect('/login');
        return;
    }
    next();
}

    next();
}

page(decorateContext);
page("/index.html", "/");
page("/", homePage);
page("/register", registerPage);
page("/login", loginPage);
page("/logout", logoutAction);
page("/logout", requireAuth, logoutAction);
page("/shows", dashboardPage);

page.start();