import page from "./lib/page.mjs";

import { decorateCTX, guardRoute, setNavigation } from "./utils/utils.js";
import { detailsPage } from "./views/app/details.js";
import { editPage } from "./views/app/edit.js";
import { myPostsPage } from "./views/app/myPosts.js";
import { submitPage } from "./views/app/submit.js";
import { logoutAction } from "./views/auth/logout.js";
import { homePage } from "./views/home/home.js";

// setNavigation();

page(decorateCTX);
page("/index.html", "/");
page("/", homePage);
page("/logout", guardRoute('user'), logoutAction);
page("/submit", guardRoute('user'), submitPage);
page("/my-posts", guardRoute('user'), myPostsPage);
page("/edit/:id", guardRoute('user'), editPage);
page("/details/:id", guardRoute('user'), detailsPage);

page.start();