import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { loginPage } from "./views/auth/login.js";
import { homePage } from "./views/home/home.js";
setNavigation();
page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/login", guardRoute('guest'), loginPage);
page.start();