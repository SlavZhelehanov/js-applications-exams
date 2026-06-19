import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { showNotification } from "../../utils/utils.js";

function template(onCreate) {
    return html`
        <section id="viewSubmit">
            <div class="submitArea">
                <h1>Submit Link</h1>
                <p>Please, fill out the form. A thumbnail image is not required.</p>
            </div>
            <div class="submitArea formContainer">
                <form id="submitForm" class="submitForm" @submit=${onCreate}>
                    <label>Link URL:</label>
                    <input name="url" value="" type="text">
                    <label>Link Title:</label>
                    <input name="title" value="" type="text">
                    <label>Link Thumbnail Image (optional):</label>
                    <input name="image" value="" type="text">
                    <label>Comment (optional):</label>
                    <textarea name="comment"></textarea>
                    <input id="btnSubmitPost" value="Submit" type="submit">
                </form>
            </div>
        </section>`;
}

export async function submitPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            url: formData.get('url').trim(),
            title: formData.get('title').trim(),
            description: formData.get('comment').trim(),
            imageUrl: formData.get('image').trim()
        }

        if (Object.values(item).some((x) => !x)) return showNotification('error', "All fields are required!");

        try {
            await post("/app", item);
            showNotification('info', "Post created.");
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showNotification('error', err.message);
            else showNotification('error', err);
        }
    }

    return ctx.render(template(onCreate));
}