import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/app/dashboard.js";
import {loginPage} from "./views/auth/login.js";
import {registerPage} from "./views/auth/register.js";
import {createPage} from "./views/app/create.js";
import {detailsPage} from "./views/app/details.js";
import {editPage} from "./views/app/edit.js";
import {myListingsPage} from "./views/app/my-listings.js";
import {searchPage} from "./views/home/search.js";
import {logoutAction} from "./views/auth/logout.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/app", dashboardPage);
page("/login", guardRoute("guest"), loginPage);
page("/register", guardRoute("guest"), registerPage);
page("/logout", guardRoute("user"), logoutAction);
page("/create", guardRoute("user"), createPage);
page("/details/:id", detailsPage);
page("/edit/:id", guardRoute("user"), editPage);
page("/my-listings", guardRoute("user"), myListingsPage);
page("/search", searchPage);

page.start();