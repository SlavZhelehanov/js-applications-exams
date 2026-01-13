import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {logoutAction} from "./views/auth/logout.js";
import {dashboardPage} from "./views/app/dashboard.js";
import {profilePage} from "./views/app/profile.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/login", guardRoute("guest"), loginPage);
page("/logout", guardRoute("user"), logoutAction);
page("/app", guardRoute("user"), dashboardPage);
page("/my-songs", guardRoute("user"), profilePage);

page.start();