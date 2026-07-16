import { html } from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="viewMyMessages">
            <h1>My Messages</h1>
            <div class="messages" id="myMessages">
                <table>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>Message</th>
                            <th>Date Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Maria Ivanova (maria)</td>
                            <td>Hi, Peter</td>
                            <td>29.11.2016 9:43:18</td>
                        </tr>
                        <tr>
                            <td>todor</td>
                            <td>Pesho, how are you?</td>
                            <td>29.11.2016 11:53:44</td>
                        </tr>
                        <tr>
                            <td>Maria Ivanova (maria)</td>
                            <td>Peter, please reply.</td>
                            <td>1.11.2016 14:08:03</td>
                        </tr>
                        <tr>
                            <td>Marin Marinov</td>
                            <td>Peter, I am Marin from Varna.</td>
                            <td>1.03.2015 4:18:43</td>
                        </tr>
                        <tr>
                            <td>Kiril (kiro)</td>
                            <td>Happy new year!</td>
                            <td>1.1.2017 0:00:01</td>
                        </tr>
                        <!-- TODO: more messages will come here -->
                    </tbody>
                </table>
            </div>
        </section>`;
}

export async function myMessagesPage(ctx) {
    ctx.render(template());
}