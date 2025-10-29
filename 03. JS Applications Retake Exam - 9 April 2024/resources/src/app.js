import { render } from "../node_modules/lit-html/lit-html.js";
import page from "./lib/page.mjs";

import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/solutions/dashboard.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {createPage} from "./views/solutions/create.js";
import {editPage} from "./views/solutions/edit.js";
import {detailsPage} from "./views/solutions/details.js";

const main = document.getElementsByTagName('main')[0];

function decorateCTX(ctx, next) {
    ctx.render = function (content) {
        return render(content, main);
    }
    next();
}

page(decorateCTX);
page("/", homePage);
page("/solutions", dashboardPage);
page("/register", registerPage);
page("/login", loginPage);
page("/create", createPage);
page("/edit", editPage);
page("/details", detailsPage);

page.start();