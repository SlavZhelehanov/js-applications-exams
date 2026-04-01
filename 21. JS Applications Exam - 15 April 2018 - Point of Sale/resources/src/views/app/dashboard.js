import { html } from "../../lib/lit-html.min.js";

function template() {
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
                <div class="row">
                    <div class="col wide">2018-04-15 14:58</div>
                    <div class="col wide">10</div>
                    <div class="col">110.00</div>
                    <div class="col">
                        <a href="#">Details</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col wide">2018-04-15 12:33</div>
                    <div class="col wide">15</div>
                    <div class="col">160.50</div>
                    <div class="col">
                        <a href="#">Details</a>
                    </div>
                </div>
                <div class="table-foot">
                    <form id="create-receipt-form">
                        <div class="col wide">
                        </div>
                        <div class="col wide right">Total:</div>
                        <div class="col">270.50</div>
                        <div class="col">
                        </div>
                    </form>
                </div>
            </div>
        </section>`;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}