import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { formatPrice } from "../../utils/utils.js";

function template(data) {
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
                                    <a href="/${product.productId}/details">Details</a>
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

    try {
        data = await get(`/app`);
    } catch (error) {
        if (error.message) return console.log(error.message);
        return console.log(error);
    }

    return ctx.render(template(data));
}