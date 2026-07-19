import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`<section id="viewArchiveSent">
            <h1>Archive (Sent Messages)</h1>
            <div class="messages" id="sentMessages">
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
                    <tr>
                        <td>peter</td>
                        <td>Hi, Peter</td>
                        <td>29.11.2016 9:43:18</td>
                        <td><button>Delete</button></td>
                    </tr>
                    <tr>
                        <td>todor</td>
                        <td>Todor, how are you?</td>
                        <td>3.07.2016 8:06:03</td>
                        <td><button>Delete</button></td>
                    </tr>
                    <tr>
                        <td>maria</td>
                        <td>Party this evening?</td>
                        <td>9.06.2016 19:55:59</td>
                        <td><button>Delete</button></td>
                    </tr>
                    <!-- TODO: more messages will come here -->
                    </tbody>
                </table>
            </div>
        </section>`;
}

export async function archiveSentPage(ctx) {
    return ctx.render(template());
}