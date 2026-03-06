import page from "./lib/page.js";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
import {homePage} from "./views/home/home";

setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);

page.start();