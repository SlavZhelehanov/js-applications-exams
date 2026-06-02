import { get } from "../../utils/api.js";
import { clearUserData } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        // await get("/auth/logout");
        clearUserData();
        alert('info', 'Logout successful.');
        ctx.setNavigation();
    } catch (err) {
        if (err.message) alert('error', err.message);
        else alert('error', err);
    }
    return ctx.page.redirect('/');
}