import { get } from "../../utils/api.js";
import { clearUserData } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        // await get("/auth/logout");
        clearUserData();
        ctx.setNavigation();
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }
    return ctx.page.redirect('/');
}