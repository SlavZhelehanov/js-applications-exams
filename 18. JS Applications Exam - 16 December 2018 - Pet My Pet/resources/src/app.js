import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {createPage} from "./views/app/create.js";
import {dashboardPage} from "./views/app/dashboard.js";
import {detailsPage} from "./views/app/details.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/login", guardRoute("guest"), loginPage);
page("/create", guardRoute("user"), createPage);
page("/dashboard", guardRoute("user"), dashboardPage);
page("/details/:id", guardRoute("user"), detailsPage);
page.start();