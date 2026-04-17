import page from "./lib/page.js";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import { logoutAction } from "./views/auth/logout.js";
import { homePage } from "./views/home/home.js";

setNavigation();

page(decorateCTX);
page("/skeleton.html", "/");
page("/", homePage);
page("/logout", guardRoute('user'), logoutAction);

page.start();