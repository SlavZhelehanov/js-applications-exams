import { clearUserData, showSuccess } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        clearUserData();
        showSuccess("Successful logout");
        ctx.setNavigation();
        ctx.page.redirect('/');
    } catch (err) {
        alert(err.message);
    }
    return ctx.page.redirect('/');
}