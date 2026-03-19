import {get} from "../../utils/api.js";
import {clearUserData, showMessage} from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        showMessage("loadingBox", "Loading...");

        await get("/users/logout");
        clearUserData();
        await showMessage("infoBox", "Logout successful.");
        ctx.setNavigation();
    } catch (err) {
        if (err.message) showMessage("errorBox", err.message);
        else showMessage("errorBox", err);
    }
    return ctx.page.redirect('/');
}