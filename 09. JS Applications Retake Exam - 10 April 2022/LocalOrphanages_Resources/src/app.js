import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {dashboardPage} from "./views/app/dashboard.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", dashboardPage)

page.start();