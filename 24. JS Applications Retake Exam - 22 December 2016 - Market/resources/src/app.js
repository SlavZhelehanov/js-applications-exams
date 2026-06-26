import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { shopPage } from "./views/app/shop.js";
import { loginPage } from "./views/auth/login.js";
import { registerPage } from "./views/auth/register.js";
import { homePage } from "./views/home/home.js";
setNavigation();
page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/login", guardRoute('guest'), loginPage);
page("/register", guardRoute('guest'), registerPage);
page("/shop", guardRoute('user'), shopPage);

page.start();