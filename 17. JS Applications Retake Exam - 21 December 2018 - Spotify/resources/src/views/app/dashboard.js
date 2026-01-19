import {html} from "../../lib/lit-html.min.js";
import {get} from "../../utils/api.js";
import {showMessage} from "../../utils/utils";

function template(data, isAuth, onLike) {
    return html`
        <section id="allSongsView">
            <div class="background-spotify">
                <div class="song-container">
                    <h1>All Songs</h1>
                    <a href="/create">
                        <button type="button" class="btn-lg btn-block new-song-btn">Add a new song</button>
                    </a>
                    ${0 < data.length
                            ? data.map(m => html`
                                <div class="song">
                                    <h5>Title: ${m.title}</h5>
                                    <h5>Artist: ${m.artist}</h5>
                                    <img class="cover" src=${m.imageUrl}/>

                                    ${isAuth?._id === m._ownerId
                                            ? html`<p>Likes: ${m.likes}; Listened 1500 times</p>
                                            <a href="#">
                                                <button type="button" class="btn btn-danger mt-4">Remove</button>
                                            </a>
                                            <a href="#">
                                                <button type="button" class="btn btn-success mt-4">Listen</button>
                                            </a>`
                                            : html`<p>Likes: ${m.likes}</p>
                                            <a>
                                                <button @click=${() => onLike(m._id)} type="button"
                                                        class="btn btn-primary mt-4">Like
                                                </button>
                                            </a>`
                                    }`)
                            : html`<h2>There are no songs yet!</h2>`
                    }
                </div>
            </div>
        </section>`;
}

export async function dashboardPage(ctx) {
    const isAuth = ctx.userData;
    let data = [], totalLikes;

    async function onLike(id) {
        try {
            await post(`/data/likes`, {songId: id});
            showMessage("info", "Liked!");
            ctx.page.redirect('/app');
        } catch (err) {
            console.log(err.message);
        }
    }

    try {
        data = await get('/data/songs?sortBy=_createdOn%20desc');
        totalLikes = await get("/data/likes");

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < totalLikes.length; j++) {
                if (data[i]._id === totalLikes[j].songId) data[i].likes++;
            }
        }
    } catch (err) {
        if (err.message) showMessage("err", err.message);
        else showMessage("err", err);
    }

    ctx.render(template(data, isAuth, onLike));
}