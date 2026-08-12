import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { showError, showInfo, showLoading } from "../../utils/utils.js";

function template({ onCreate }) {
    return html`<div class="container home wrapper  my-md-5 pl-md-5">
            <div class=" d-md-flex flex-mb-equal ">
                <div class="col-md-6">
                    <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
                </div>
                <form class="form-idea col-md-5" @submit=${onCreate} method="post">
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
                    </div>
                    <div class="form-label-group">
                        <label for="ideaTitle">Title</label>
                        <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                            required="" autofocus="">
                    </div>
                    <div class="form-label-group">
                        <label for="ideaDescription">Description</label>
                        <textarea type="text" name="description" class="form-control" placeholder="Description"
                            required=""></textarea>
                    </div>
                    <div class="form-label-group">
                        <label for="inputURL">Add Image</label>
                        <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                            required="">

                    </div>
                    <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

                    <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
                </form>
            </div>
        </div>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const item = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageURL: formData.get('imageURL')?.trim()
        };

        if (item.title.length < 6) return showError('The title should be at least 6 characters long.');
        if (item.description.length < 10) return showError('The description should be at least 10 characters long.');
        if (!item.imageURL.startsWith('http://') && !item.imageURL.startsWith('https://')) return showError('The image should start with "http://" or "https://".');

        try {
            showLoading();
            await post("/app", item);
            showInfo("Idea created successfully.");
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            if (err.message) showError(err.message);
            else showError(err);
        }
    }

    return ctx.render(template({ onCreate }));
}