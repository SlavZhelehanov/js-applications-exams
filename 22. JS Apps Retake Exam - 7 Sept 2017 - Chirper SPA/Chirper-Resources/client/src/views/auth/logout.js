import { get } from "../../utils/api.js";
import { clearUserData, showNotification } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        // await get("/auth/logout");
        clearUserData();
        showNotification('info', 'Logout successful.');
        ctx.setNavigation();
    } catch (err) {
        if (err.message) showNotification('error', err.message);
        else showNotification('error', err);
    }
    return ctx.page.redirect('/');
}