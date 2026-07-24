import { html } from "../../lib/lit-html.min.js";
import { get, del } from "../../utils/api.js";
import { formatDate, showError, showInfo, showLoading } from "../../utils/utils.js";

function template(data, onDelete) {
    return html`<section id="viewArchiveSent">
        <h1>Archive (Sent Messages)</h1>
        ${data.length === 0
            ? html`<p class="no-messages">Няма архивирани изпратени съобщения.</p>`
            : html`<div class="messages" id="sentMessages">
                <table>
                    <thead>
                    <tr>
                        <th>To</th>
                        <th>Message</th>
                        <th>Date Sent</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${data.map(msg => html`
                            <tr>
                                <td>${msg.receiverUsername}</td>
                                <td>${msg.message}</td>
                                <td>${formatDate(msg.createdAt)}</td>
                                <td><button @click=${() => onDelete(msg.messageId)}>Delete</button></td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>`
        }
    </section>`;
}

export async function archiveSentPage(ctx) {
    let data = [];

    async function onDelete(id) {
        const confirm = window.confirm("Are you sure you want to delete the message?");

        if (!confirm) return;

        try {
            showLoading();
            await del(`/app/${id}`);
            showInfo("Message deleted.");
            ctx.page.redirect('/archive');
        } catch (err) {
            if (err.message) showError(err.message);
            else showError(err);
        }
    }

    try {
        data = await get('/app/archive');
    } catch (error) {
        if (err.message) showError(err.message);
        else showError(err);
    }
    return ctx.render(template(data, onDelete));
}