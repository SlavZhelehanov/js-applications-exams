import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";
import {getUserData} from "./utils/utils.js";
import {layoutPage} from "./views/layouts/main.js";

const wrapper = document.getElementById('wrapper');

function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(content) {
    const userData = getUserData();

    render(layoutPage(userData, content), wrapper);
}

page(decorateContext);
page("/index.html", "/");