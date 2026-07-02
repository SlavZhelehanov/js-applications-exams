import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data) {
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
                                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                                    <td><button @click=${() => removeFromCart(item.productId)}>Remove</button></td>
                                </tr>
                            `)
                            : html`<tr><td colspan="5">Your cart is empty</td></tr>`
                        }
                    </tbody>
                </table>
            </div>
        </section>`;
}

function removeFromCart(productId) {
    // TODO: Implement remove from cart functionality
    console.log(`Remove product with ID: ${productId}`);
}

export async function cartPage(ctx) {
    let data = [];

    try {
        data = await get(`/app/cart`);
    } catch (error) {
        if (error.message) return console.log(error.message);
        return console.log(error);
    }

    return ctx.render(template(data));
}