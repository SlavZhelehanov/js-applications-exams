import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";
import { formatDate } from '../../utils/utils.js';

function template(data) {
    return html`
        <section id="viewMyMessages">
            <h1>My Messages</h1>
            <div class="messages" id="myMessages">
                ${data.length === 0
            ? html`<p class="no-messages">No messages yet.</p>`
            : html`
                        <table>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Message</th>
                                    <th>Date Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.map(msg => html`
                                    <tr>
                                        <td>${msg.senderUsername}</td>
                                        <td>${msg.message}</td>
                                        <td>${formatDate(msg.createdAt)}</td>
                                    </tr>
                                `)}
                            </tbody>
                        </table>
                    `}
            </div>
        </section>`;
}

export async function myMessagesPage(ctx) {
    let data = [];

    try {
        data = await get(`/app/my-messages`);
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template(data));
}