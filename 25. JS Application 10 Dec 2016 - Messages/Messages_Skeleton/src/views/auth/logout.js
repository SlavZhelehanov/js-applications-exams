import { get } from "../../utils/api.js";
import { clearUserData } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        await get("/auth/logout");
        clearUserData();
        ctx.setNavigation();
        ctx.page.redirect('/');
    } catch (err) {
        alert(err.message);
    }
    return ctx.page.redirect('/');
}