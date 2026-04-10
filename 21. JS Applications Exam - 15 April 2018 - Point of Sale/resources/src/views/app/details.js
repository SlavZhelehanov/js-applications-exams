import { html } from '../../lib/lit-html.min.js';
import { get } from '../../utils/api.js';

function template({ data }) {
    return html`        
        <section id="receipt-details-view">
            <h1>Receipt Details</h1>
            <div class="table">
                <div class="table-head">
                    <div class="col wide">Product Name</div>
                    <div class="col wide">Quantity</div>
                    <div class="col wide">Price per Unit</div>
                    <div class="col">Sub-total</div>
                </div>
                ${0 < data.length
            ? data.map(el => html`<div class="row">
                    <div class="col wide">${el.productName}</div>
                    <div class="col wide">${el.quantity}</div>
                    <div class="col wide">${el.price.toFixed(2)}</div>
                    <div class="col">${(el.price * el.quantity).toFixed(2)}</div>
                </div>`)
            : null
        }
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const { id } = ctx.params
    let data = [];

    try {
        data = await get(`/jsonstore/receipts/${id}`);
    } catch (error) {
        alert(error.message);
    }
    ctx.render(template({ data: data.data }));
}