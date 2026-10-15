import { clearUserData } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        clearUserData();
        ctx.setNavigation();
        ctx.page.redirect('/');
    } catch (err) {
        alert(err.message);
    }
    return ctx.page.redirect('/');
}