import page from "./lib/page.mjs";

import {decorateCTX, guardRoute, setNavigation} from "./utils/utils.js";
page(decorateCTX);
page("/index.html", "/");
