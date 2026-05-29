import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="viewEdit">
            <div class="submitArea">
                <h1>Edit Link</h1>
                <p>Please, fill out the form. A thumbnail image/description is not required.</p>
            </div>
            <div class="submitArea formContainer">
                <form id="editPostForm" class="submitForm">
                    <label>Link URL:</label>
                    <input name="url" type="text"
                           value="https://www.cnbc.com/2017/06/28/progress-buys-mobile-backend-start-up-kinvey-for-49-million.html">
                    <label>Link Title:</label>
                    <input name="title" type="text" value="Progress Software buys Kinvey">
                    <label>Link Thumbnail Image (optional):</label>
                    <input name="image" type="text"
                           value="https://pbs.twimg.com/profile_images/464099715865276417/nXvsGPVO.png">
                    <label>Comment (optional):</label>
                    <textarea name="description">No desc</textarea>
                    <input id="btnEditPost" type="submit" value="Edit Post">
                </form>
            </div>
        </section>`;
}

export async function editPage(ctx) {
    return ctx.render(template());
}