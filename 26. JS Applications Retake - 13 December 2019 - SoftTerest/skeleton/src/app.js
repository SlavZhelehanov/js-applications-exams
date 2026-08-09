import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { homePage } from "./views/home/home.js";
import { loginPage } from "./views/auth/login.js";
import { registerPage } from "./views/auth/register.js";
import { createPage } from "./views/app/create.js";
import { logoutAction } from "./views/auth/logout.js";
import { detailsPage } from "./views/app/details.js";
import { myDataPage } from "./views/app/my-data.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/login", guardRoute("guest"), loginPage);
page("/register", guardRoute("guest"), registerPage);
page("/logout", guardRoute("user"), logoutAction);
page("/create", guardRoute("user"), createPage);
page("/my-data", guardRoute("user"), myDataPage);
page("/:id/details", guardRoute("user"), detailsPage);

page.start();