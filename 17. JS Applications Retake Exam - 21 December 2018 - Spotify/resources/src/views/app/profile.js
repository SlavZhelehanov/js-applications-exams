import {html} from '../../lib/lit-html.min.js';
import {get} from "../../utils/api.js";
import {showMessage} from "../../utils/utils";

function template(songs) {
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
                                    <a href="/delete/${m._id}">
                                        <button type="button" class="btn btn-danger mt-4">Remove</button>
                                    </a>
                                    <a href="/listen/${m._id}">
                                        <button type="button" class="btn btn-success mt-4">Listen</button>
                                    </a>
                                    <p>Likes: 100</p>
                                    <a href="/like/${m._id}">
                                        <button type="button" class="btn btn-primary mt-4">Like</button>
                                    </a>
                                </div>`)
                            : html`<h2>You have no songs yet!</h2>`
                    }
                </div>
            </div>
        </section>`;
}

export async function myProfilePage(ctx) {
    let songs = [];

    try {
        songs = await get(`/data/songs?where=_ownerId%3D%22${ctx.userData._id}%22&sortBy=_createdOn%20desc`);
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }

    ctx.render(template(songs));
}