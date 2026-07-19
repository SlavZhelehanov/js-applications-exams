import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { homePage } from "./views/home/home.js";
import { loginPage } from "./views/auth/login.js";
import { registerPage } from "./views/auth/register.js";
import { createPage } from "./views/app/create.js";
import { logoutAction } from "./views/auth/logout.js";
import { myMessagesPage } from "./views/app/my-messages.js";
import { archiveSentPage } from "./views/app/archiveSent.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/app", dashboardPage);
page("/login", guardRoute("guest"), loginPage);
page("/register", guardRoute("guest"), registerPage);
page("/logout", guardRoute("user"), logoutAction);
page("/send", guardRoute("user"), createPage);
page("/my-messages", guardRoute("user"), myMessagesPage);
page("/archive", guardRoute("user"), archiveSentPage);

page.start();