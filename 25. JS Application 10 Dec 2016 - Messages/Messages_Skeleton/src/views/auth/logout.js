import { get } from "../../utils/api.js";
import { clearUserData, showError, showInfo, showLoading } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        showLoading();
        await get("/auth/logout");
        clearUserData();
        showInfo("Logout successful.");
        ctx.setNavigation();
        ctx.page.redirect('/');
    } catch (err) {
        if (err.message) showError(err.message);
        else showError(err);
    }
    return ctx.page.redirect('/');
}