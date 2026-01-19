import {html} from '../../lib/lit-html.min.js';
import {get, put, del} from "../../utils/api.js";
import {showMessage} from "../../utils/utils.js";

function template(songs, onDelete, onListen) {
    return html`
        <section id="mySongsView">
            <div class="background-spotify">
                <div class="song-container">
                    <h1>My Songs</h1>
                    ${0 < songs.length
                            ? songs.map(m => html`
                                <div class="song">
                                    <h5>Title: ${m.title}</h5>
                                    <h5>Artist: ${m.artist}</h5>
                                    <img class="cover" src=${m.imageUrl}/>
                                    <p>Likes: ${m.likes}; Listened ${m.listened} times</p>
                                    <a><button @click=${() => onDelete(m._id)} type="button" class="btn btn-danger mt-4">Remove</button></a>                                    
                                    <a><button @click=${() => onListen(m)} type="button" class="btn btn-success mt-4">Listen</button></a>
                                </div>`)
                            : html`<h2>You have no songs yet!</h2>`
                    }
                </div>
            </div>
        </section>`;
}

export async function myProfilePage(ctx) {
    let songs = [];

    async function onDelete(id) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                showMessage( "loading", 'Loading...');
                await del(`/data/songs/${id}`);
                await showMessage("info", "Song removed successfully!");
                ctx.page.redirect('/my-songs');
            } catch (err) {
                if (err.message) showMessage("err", err.message);
                else showMessage("err", err);
            }
        }
    }

    async function onListen(song) {
        let { title, artist, imageUrl, listened, likes } = song;

        try {
            await put(`/data/songs/${song._id}`, { title, artist, imageUrl, listened: listened + 1, likes });
            await showMessage("info", `You just listened ${title}`);
            ctx.page.redirect('/my-songs');
        } catch (err) {
            if (err.message) showMessage("err", err.message);
            else showMessage("err", err);
        }
    }

    try {
        songs = await get(`/data/songs?where=_ownerId%3D%22${ctx.userData._id}%22&sortBy=_createdOn%20desc`);
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }

    ctx.render(template(songs, onDelete, onListen));
}