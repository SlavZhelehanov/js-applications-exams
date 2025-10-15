import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js";
import {layoutPage} from "./views/layouts/main.js";

const wrapper = document.getElementById('wrapper');

page(decorateContext)
page("index.html", "/");

function decorateContext(ctx, next) {
    ctx.render = renderView;
    return next();
}

function renderView(content) {
    const userData = {};
    render(layoutPage(userData, content), wrapper);
}