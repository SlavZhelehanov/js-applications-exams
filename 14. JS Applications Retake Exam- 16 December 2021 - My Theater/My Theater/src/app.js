import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {logoutAction} from "./views/auth/logout.js";
import {createPage} from "./views/app/create.js";
import {editPage} from "./views/app/edit.js";
import {detailsPage} from "./views/app/details.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/login", guardRoute("guest"), loginPage);
page("/logout", guardRoute("user"), logoutAction);
page("/create", guardRoute("user"), createPage);
page("/edit/:id", guardRoute("user"), editPage);
page("/details/:id", detailsPage);

page.start();