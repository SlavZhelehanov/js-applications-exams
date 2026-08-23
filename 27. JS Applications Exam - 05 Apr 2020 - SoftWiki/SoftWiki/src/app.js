import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { homePage } from "./views/home/home.js";
import { registerPage } from "./views/auth/register.js";
import { createPage } from "./views/app/create.js";
import { logoutAction } from "./views/auth/logout.js";

setNavigation();
page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/logout", guardRoute("user"), logoutAction);
page("/create", guardRoute("user"), createPage);
