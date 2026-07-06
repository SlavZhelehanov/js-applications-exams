import { html } from "../../lib/lit-html.min.js";
import { get, put } from "../../utils/api.js";
import { formatPrice, showNotification } from "../../utils/utils.js";

function template({ data, onSubmit }) {
    return html`
        <section id="viewShop">
            <h1>Products</h1>
            <div class="products" id="shopProducts">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(product => html`
                            <tr>
                                <td>${product.productName}</td>
                                <td>${product.description}</td>
                                <td>$${formatPrice(product.price)}</td>
                                <td>
                                    <a @click=${() => onSubmit(product.productId, product.productName)} href="#">Purchase</a>
                                </td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

export async function shopPage(ctx) {
    let data = [];

    async function onSubmit(productId, productName) {
        try {
            await put(`/app/${productId}/purchase`, { productId });
            showNotification('info', `Product purchased.`);
            ctx.page.redirect('/cart');
        } catch (err) {
            if (err.message) showNotification('error', err.message);
            else showNotification('error', err);
        }
    }

    try {
        data = await get(`/app`);
    } catch (err) {
        if (err.message) showNotification('error', err.message);
        else showNotification('error', err);
    }

    return ctx.render(template({ data, onSubmit }));
}