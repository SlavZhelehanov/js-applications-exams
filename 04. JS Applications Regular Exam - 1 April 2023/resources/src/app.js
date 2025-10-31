import { render } from "./lib/lit-html.min.js";
import page from "./lib/page.mjs";

import {getUserData, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/fruits/dashboard.js";

const main = document.getElementsByTagName('main')[0];

setNavigation();

function decorateCTX(ctx, next) {
    ctx.render = function (content) {
        return render(content, main);
    }
    ctx.setNavigation = setNavigation;
    ctx.userData = getUserData();
    next();
}

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/fruits", dashboardPage);

page.start();