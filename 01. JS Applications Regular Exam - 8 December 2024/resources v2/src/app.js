import {render} from "./lib/lit-html.min.js";
import page from "./lib/page.mjs";

import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/drones/dashboard.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {createPage} from "./views/drones/create.js";
import {editPage} from "./views/drones/edit.js";
import {detailsPage} from "./views/drones/details.js";
import {getUserData, setNavigation} from "./utils/utils.js";
import {logoutAction} from "./views/auth/logout.js";

const main = document.getElementById('main-element');

setNavigation();

function decorateCTX(ctx, next) {
    ctx.render = function (content) {
        return render(content, main);
    };
    ctx.setNavigation = setNavigation;
    ctx.userData = getUserData();
    next();
}

page(decorateCTX);
page("/", homePage);
page("/catalog", dashboardPage);
page("/register", registerPage);
page("/login", loginPage);
page("/logout", logoutAction);
page("/sell", createPage);
page("/edit/:id", editPage);
page("/details/:id", detailsPage);
page.start();