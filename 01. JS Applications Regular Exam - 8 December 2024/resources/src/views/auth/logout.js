import {logout} from '../../services/authService.js';

export async function logoutAction(ctx) {
    await logout();
    ctx.page.redirect('/');
}