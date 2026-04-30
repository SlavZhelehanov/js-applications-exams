import page from "./lib/page.js";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { myPage } from "./views/app/my.js";
import { profilePage } from "./views/app/profile.js";
import { discoverPage } from "./views/auth/discover.js";
import { logoutAction } from "./views/auth/logout.js";
import { homePage } from "./views/home/home.js";

setNavigation();

page(decorateCTX);
page("/skeleton.html", "/");
page("/", homePage);
page("/discover", guardRoute('user'), discoverPage);
page("/logout", guardRoute('user'), logoutAction);
page("/my", guardRoute('user'), myPage);
page("/profile/:username", guardRoute('user'), profilePage);

page.start();