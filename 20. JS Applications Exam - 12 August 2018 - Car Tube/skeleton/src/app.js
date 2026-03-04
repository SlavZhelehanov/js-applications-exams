import page from "./lib/page.js";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";

// setNavigation();

page(decorateCTX);
page("/index.html", "/");

page.start();