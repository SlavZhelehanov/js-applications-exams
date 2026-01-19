import { html } from "../../lib/lit-html.min.js";
import { post } from "../../utils/api.js";
import { showMessage } from "../../utils/utils.js";

function template(onCreate) {
    return html`
        <section id="createSongView">
            <div class="background-spotify">
                <div class="song-container">
                    <h1>Create new song</h1>
                    <form @submit=${onCreate}>
                        <div class="form-group">
                            <label for="title" class="white-labels">Title</label>
                            <input id="title" type="text" name="title" class="form-control" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label for="artist" class="white-labels">Artist</label>
                            <input id="artist" type="text" name="artist" class="form-control" placeholder="Artist">
                        </div>
                        <div class="form-group">
                            <label for="imageURL" class="white-labels">imageURL</label>
                            <input id="imageURL" type="text" name="imageURL" class="form-control" placeholder="imageURL">
                        </div>
                        <button type="submit" class="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </section>`;
}

export async function createPage(ctx) {
    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const item = {
            title: formData.get('title').trim(),
            artist: formData.get('artist').trim(),
            imageUrl: formData.get('imageURL').trim()
        }

        // if (Object.values(item).some((x) => !x)) return alert("All fields are required!");
        if(item.title.length < 6) return showMessage( "err",'The title should be at least 6 characters long');
        if(item.artist.length < 3) return showMessage( "err",'The artist should be at least 3 characters long');
        if(!item.imageUrl.startsWith('http://') && !item.imageUrl.startsWith('https://')) return showMessage( "err",'The image should start with http:// or https://');

        try {
            await post("/data/songs", { ...item, likes: 0, listened: 0 });
            await showMessage("info", 'Song created successfully.');
            e.target.reset();
            ctx.page.redirect('/app');
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    ctx.render(template(onCreate));
}