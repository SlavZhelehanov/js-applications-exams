import { html } from "../../lib/lit-html.min.js";

function template() {
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
                            <!-- TODO: more messages will come here -->
                        </tbody>
                    </table>
                </div>
            </section>`;
}

export async function cartPage(ctx) {
    return ctx.render(template());
}