import { get } from "../../utils/api.js";

export async function logoutAction(ctx) {
    try {
        await get("/auth/logout");
        clearUserData();
        ctx.setNavigation();
        ctx.page.redirect('/');
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }
    return ctx.page.redirect('/');
}