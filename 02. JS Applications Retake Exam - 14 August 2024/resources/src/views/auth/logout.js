import {logout} from '../../services/authService.js';

export async function logoutAction(ctx) {
    await logout();
    ctx.setUserNav();
    return ctx.page.redirect('/');
}