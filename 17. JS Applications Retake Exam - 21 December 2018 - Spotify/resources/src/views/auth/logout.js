import { get } from "../../utils/api.js";
import { clearUserData, showMessage } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        await get("/users/logout");
        clearUserData();
        await showMessage("info", "Logout successful.");
        ctx.setNavigation();
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }
    return ctx.page.redirect('/');
}