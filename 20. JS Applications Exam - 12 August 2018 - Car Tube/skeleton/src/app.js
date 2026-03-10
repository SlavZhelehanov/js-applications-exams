import page from "./lib/page.js";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home.js";
import {registerPage} from "./views/auth/register.js";
import {loginPage} from "./views/auth/login.js";
import {profilePage} from "./views/app/profile.js";
import {detailsPage} from "./views/app/details.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/register", guardRoute("guest"), registerPage);
page("/login", guardRoute("guest"), loginPage);
page("/my-listings", guardRoute("user"), profilePage);
page("/details/:id", guardRoute("user"), detailsPage);

page.start();