import page from "./lib/page.js";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/app/dashboard.js";
import {detailsPage} from "./views/app/details.js";
import {logoutAction} from "./views/auth/logout.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/dashboard", guardRoute("user"), dashboardPage);
page("/details/:id", guardRoute("user"), detailsPage);
page("/logout", guardRoute("user"), logoutAction);
page.start();