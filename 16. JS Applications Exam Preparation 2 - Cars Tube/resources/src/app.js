import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/app/dashboard.js";
import {loginPage} from "./views/auth/login.js";
import {registerPage} from "./views/auth/register.js";
import {createPage} from "./views/app/create.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/app", dashboardPage);
page("/login", guardRoute("guest"), loginPage);
page("/register", guardRoute("guest"), registerPage);
page("/create", guardRoute("user"), createPage);

page.start();