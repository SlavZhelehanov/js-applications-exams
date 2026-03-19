import page from "./lib/page.js";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { createPage } from "./views/app/create.js";
import { detailsPage } from "./views/app/details.js";
import { editPage } from "./views/app/edit.js";
import { profilePage } from "./views/app/profile.js";
import { loginPage } from "./views/auth/login.js";
import { logoutAction } from "./views/auth/logout.js";
import { registerPage } from "./views/auth/register.js";
import { homePage } from "./views/home/home.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/logout", guardRoute("user"), logoutAction);
page("/login", guardRoute("guest"), loginPage);
page("/create", guardRoute("user"), createPage);
page("/edit/:id", guardRoute("user"), editPage);
page("/my-listings", guardRoute("user"), profilePage);
page("/details/:id", guardRoute("user"), detailsPage);

page.start();