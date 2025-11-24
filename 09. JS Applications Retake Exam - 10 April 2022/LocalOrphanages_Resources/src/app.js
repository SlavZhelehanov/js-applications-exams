import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {dashboardPage} from "./views/app/dashboard.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", dashboardPage);
page("/register", guardRoute("guest"), registerPage);
page("/login", guardRoute("guest"), loginPage);

page.start();