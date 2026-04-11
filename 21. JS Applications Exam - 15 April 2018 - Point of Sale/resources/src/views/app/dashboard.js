import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { showMessage } from "../../utils/utils.js";

function template({ data, total }) {
    return html`
        <section id="all-receipt-view">
            <h1>All Receipts</h1>
            <div class="table">
                <div class="table-head">
                    <div class="col wide">Creation Date</div>
                    <div class="col wide">Items</div>
                    <div class="col">Total</div>
                    <div class="col">Actions</div>
                </div>
                ${0 < data.length
            ? data.map(el => html`<div class="row">
                    <div class="col wide">${el.creationDate}</div>
                    <div class="col wide">${el.items}</div>
                    <div class="col">${el.total.toFixed(2)}</div>
                    <div class="col">
                        <a href="/details/${el._id}">Details</a>
                    </div>
                </div>`)
            : null
        }
                <div class="table-foot">
                    <form id="create-receipt-form">
                        <div class="col wide">
                        </div>
                        <div class="col wide right">Total:</div>
                        <div class="col">${total.toFixed(2)}</div>
                        <div class="col">
                        </div>
                    </form>
                </div>
            </div>
        </section>`;
}

export async function dashboardPage(ctx) {
    let data = [], total = 0, receipts = [];

    try {
        showMessage('loadingBox', 'Loading...');
        const res = await get("/jsonstore/receipts?sortBy=_createdOn%20desc");
        Object.keys(res).forEach(k => {
            data.push(res[k]);
            total += res[k].total;
        });
        showMessage('', 'Loading...');
    } catch (err) {
        if (err.message) showMessage('errorBox', err.message);
        else showMessage('errorBox', err);
        // if (err.message) alert(err.message);
        // else alert(err);
    }
    ctx.render(template({ data, total }));
}