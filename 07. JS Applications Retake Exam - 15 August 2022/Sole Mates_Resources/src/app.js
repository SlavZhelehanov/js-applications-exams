import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {logoutAction} from "./views/auth/logout.js";
import {dashboardPage} from "./views/shoes/dashboard.js";
import {createPage} from "./views/shoes/create.js";
import {detailsPage} from "./views/shoes/details.js";
import {editPage} from "./views/shoes/edit.js";
import {searchPage} from "./views/home/search.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/login", guardRoute("guest"), loginPage);
page("/logout", guardRoute("user"), logoutAction);
page("/shoes", dashboardPage);
page("/addPair", guardRoute("user"), createPage);
page("/details/:id", detailsPage);
page("/edit/:id", guardRoute("user"), editPage);
page("/search", searchPage);

page.start();