import { html } from "../../lib/lit-html.min.js";
import { get, del } from "../../utils/api.js";
import { formatPrice } from "../../utils/utils.js";

function template({ data, removeFromCart }) {
    return html`
        <section id="viewCart">
            <h1>My Cart</h1>
            <div class="products" id="cartProducts">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length > 0
            ? data.map(item => html`
                                <tr>
                                    <td>${item.productName}</td>
                                    <td>${item.description}</td>
                                    <td>${item.quantity}</td>
                                    <td>$${formatPrice((item.price * item.quantity))}</td>
                                    <td><button @click=${() => removeFromCart(item.productId)}>Discard</button></td>
                                </tr>
                            `)
            : html`<tr><td colspan="5">Your cart is empty</td></tr>`
        }
                    </tbody>
                </table>
            </div>
        </section>`;
}

export async function cartPage(ctx) {
    let data = [];

    async function removeFromCart(productId) {
        try {
            showNotification('loading', "Discarding...");
            await del(`/app/${productId}`);
            showNotification('info', "Product discarded.");
            ctx.page.redirect(`/cart`);
        } catch (err) {
            if (err.message) showNotification('error', err.message);
            else showNotification('error', err);
        }
    }

    try {
        showNotification('loading', "Loading...");
        data = await get(`/app/cart`);
        showNotification();
    } catch (err) {
        if (err.message) showNotification('error', err.message);
        else showNotification('error', err);
    }

    return ctx.render(template({ data, removeFromCart }));
}