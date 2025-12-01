import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { homePage } from "./views/home/home.js";
import { registerPage } from "./views/auth/register.js";
import { logoutAction } from "./views/auth/logout.js";
import { loginPage } from "./views/auth/login.js";
import { dashboardPage } from "./views/app/dashboard.js";
import { createPage } from "./views/app/create.js";
import { editPage } from "./views/app/edit.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/logout", guardRoute("user"), logoutAction);
page("/login", guardRoute("guest"), loginPage);
page("/app", dashboardPage);
page("/create", guardRoute("user"), createPage);
page("/edit/:id", guardRoute("user"), editPage);

page.start();