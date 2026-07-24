import { html } from "../../lib/lit-html.min.js";
import { get, post } from "../../utils/api.js";
import { showError, showInfo, showLoading } from "../../utils/utils.js";

function template({ recipients, onCreate }) {
    return html`<section id="viewSendMessage">
            <h1>Send Message</h1>
            <form id="formSendMessage" @submit=${onCreate}>
                <div>Recipient:</div>
                <div>
                    <select name="recipient" required id="msgRecipientUsername">
                            <option id="" value="">Изберете потребител</option>
                        ${recipients.map(user => html`
                            <option id=${user.userId} value=${user.username}>${user.username}</option>
                        `)}
                    </select>
                </div>
                <div>Message Text:</div>
                <div><input type="text" name="text" required id="msgText" /></div>
                <div><input type="submit" value="Send" /></div>
            </form>
        </section>`;
}

export async function createPage(ctx) {
    let recipients = [];

    async function onCreate(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const selectEl = form.querySelector('#msgRecipientUsername');
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        const receiverId = selectedOption ? selectedOption.id : null;
        const item = {
            receiverId,
            receiverUsername: formData.get('recipient')?.trim(),
            message: formData.get('text')?.trim()
        };

        if (Object.values(item).some((x) => !x)) return alert("All fields are required!");

        try {
            showLoading();
            await post("/app", item);
            showInfo("Message sent.");
            e.target.reset();
            ctx.page.redirect('/archive');
        } catch (err) {
            if (err.message) showError(err.message);
            else showError(err);
        }
    }

    try {
        recipients = await get("/auth/recipients") || [];
    } catch (err) {
        if (err.message) showError(err.message);
        else showError(err);
    }

    return ctx.render(template({ recipients, onCreate }));
}