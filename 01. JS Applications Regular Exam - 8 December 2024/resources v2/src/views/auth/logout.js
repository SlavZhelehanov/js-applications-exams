import {logoutUser} from '../../services/authService.js';

export async function logoutAction(ctx) {
    await logoutUser();
    ctx.setNavigation();
    return ctx.page.redirect('/');
}