import { render } from "./lib/lit-html.min.js";
import page from "./lib/page.mjs";

import {getUserData, setNavigation} from "./utils/utils.js";

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

page.start();