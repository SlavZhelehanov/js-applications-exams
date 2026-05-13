import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { myChirps } from "./views/app/myChirps.js";
import { logoutAction } from "./views/auth/logout.js";
import { homePage } from "./views/home/home.js";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page('/', homePage);
page("/auth/logout", guardRoute('user'), logoutAction);
page("/chirps/me", guardRoute('user'), myChirps);

page.start();