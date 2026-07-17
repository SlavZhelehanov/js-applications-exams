import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="viewSendMessage">
            <h1>Send Message</h1>
            <form id="formSendMessage">
                <div>Recipient:</div>
                <div>
                    <select name="recipient" required id="msgRecipientUsername">
                        <option value="maria">Maria Georgieva (maria)</option>
                        <option value="guest">guest</option>
                        <option value="peter">Peter Ivanova (peter)</option>
                        <option value="todor">todor</option>
                        <!-- TODO: more users will come here -->
                    </select>
                </div>
                <div>Message Text:</div>
                <div><input type="text" name="text" required id="msgText" /></div>
                <div><input type="submit" value="Send" /></div>
            </form>
        </section>`;
}

export async function createPage(ctx) {
    ctx.render(template());
}