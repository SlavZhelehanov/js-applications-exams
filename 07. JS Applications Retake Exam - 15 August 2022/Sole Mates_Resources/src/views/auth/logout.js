import {get} from "../../utils/api.js";
import {clearUserData} from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        await get("/users/logout");
        clearUserData();
        ctx.setNavigation();
    } catch (err) {
        alert(err.message);
    }
    return ctx.page.redirect('/');
}