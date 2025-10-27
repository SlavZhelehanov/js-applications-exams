import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";

import {getUserData, setPageNavigation} from "./utils/utils.js";
// import {layoutPage} from "./views/layouts/main.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {logoutAction} from "./views/auth/logout.js";
import {dashboardPage} from "./views/shows/dashboard.js";
import {createPage} from "./views/shows/create.js";
import {detailsPage} from "./views/shows/details.js";
import {editPage} from "./views/shows/edit.js";
import {searchPage} from "./views/shows/searchPage.js";

const wrapper = document.getElementById('content');

setPageNavigation();

function decorateContext(ctx, next) {
    ctx.render = function (content) {
        return render(content, wrapper)
    };
    ctx.setUserNav = setPageNavigation;
    ctx.userData = getUserData();
    next();
}

page("/", decorateContext, homePage);
page("/register", decorateContext, registerPage);
page("/login", decorateContext, loginPage);
page("/logout", decorateContext, logoutAction);
page("/shows", decorateContext, dashboardPage);
page('/addShow', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page("/search", decorateContext, searchPage);

page.start();