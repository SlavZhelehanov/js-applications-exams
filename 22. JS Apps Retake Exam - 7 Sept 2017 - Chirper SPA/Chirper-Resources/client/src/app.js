import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { dashboardPage } from "./views/app/dashboard.js";
import { myChirps } from "./views/app/myChirps.js";
import { profiePage } from "./views/app/profile.js";
import { logoutAction } from "./views/auth/logout.js";
import { homePage } from "./views/home/home.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page('/', homePage);
page("/auth/logout", guardRoute('user'), logoutAction);
page("/dashboard", guardRoute('user'), dashboardPage);
page("/chirps/me", guardRoute('user'), myChirps);
page('/profile/:id', guardRoute('user'), profiePage);

page.start();