import { get } from "../../utils/api.js";
import { clearUserData } from "../../utils/utils.js";

export async function logoutAction(ctx) {
    try {
        await get("/users/logout");
        clearUserData();
        await alert("Logout successful.");
        ctx.setNavigation();
    } catch (err) {
        console.log(err);
        // if (err.message) showMessage("errorBox", err.message);
        // else showMessage("errorBox", err);
        if (err.message) alert(err.message);
        else alert(err);
    }
    return ctx.page.redirect('/');
}