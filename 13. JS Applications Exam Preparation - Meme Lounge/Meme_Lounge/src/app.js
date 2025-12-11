import page from "./lib/page.js";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {dashboardPage} from "./views/app/dashboard.js";
import {registerPage} from "./views/auth/register.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/app", dashboardPage);
page("/register", guardRoute("guest"), registerPage)

page.start();