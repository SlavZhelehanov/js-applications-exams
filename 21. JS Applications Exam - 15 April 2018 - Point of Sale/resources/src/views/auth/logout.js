import {get} from "../../utils/api.js";
// import {clearUserData, showMessage} from "../../utils/utils.js";
import {clearUserData} from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        // showMessage("loadingBox", "Loading...");

        clearUserData();
        await get("/users/logout");
        // await showMessage("infoBox", "Logout successful.");
        ctx.setNavigation();
    } catch (err) {
        // if (err.message) showMessage("errorBox", err.message);
        // else showMessage("errorBox", err);
        if (err.message) alert(err.message);
        else alert(err);
    }
    return ctx.page.redirect('/');
}