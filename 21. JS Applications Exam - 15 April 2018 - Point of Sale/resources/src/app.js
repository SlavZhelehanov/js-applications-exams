import page from "./lib/page.js";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/app/dashboard";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/dashboard", guardRoute("user"), dashboardPage);
page.start();