import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/fruits/dashboard.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {createPage} from "./views/fruits/create.js";
import {editPage} from "./views/fruits/edit.js";
import {detailsPage} from "./views/fruits/details.js";
import {searchPage} from "./views/home/search.js";
import {logoutAction} from "./views/auth/logout.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/fruits", dashboardPage);
page("/register", guardRoute("guest"), registerPage);
page("/login", guardRoute("guest"), loginPage);
page("/logout", guardRoute("user"), logoutAction);
page("/addFruit", guardRoute("user"), createPage);
page("/edit/:id", guardRoute("user"), editPage);
page("/details/:id", detailsPage);
page("/search", searchPage);

page.start();