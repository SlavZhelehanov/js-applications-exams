import { get } from "../../utils/api.js";
import { clearUserData, showError } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        await get("/users/logout");
        clearUserData();
        ctx.setNavigation();
    } catch (err) {
        showError(err.message);
    }
    return ctx.page.redirect('/');
}