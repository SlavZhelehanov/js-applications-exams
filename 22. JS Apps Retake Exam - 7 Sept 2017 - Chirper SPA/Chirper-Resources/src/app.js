import page from "./lib/page.js";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { myPage } from "./views/app/my.js";
import { discoverPage } from "./views/auth/discover.js";
import { logoutAction } from "./views/auth/logout.js";
import { homePage } from "./views/home/home.js";

setNavigation();

page(decorateCTX);
page("/skeleton.html", "/");
page("/", homePage);
page("/logout", guardRoute('user'), logoutAction);
page("/discover", guardRoute('user'), discoverPage);
page("/my", guardRoute('user'), myPage);

page.start();