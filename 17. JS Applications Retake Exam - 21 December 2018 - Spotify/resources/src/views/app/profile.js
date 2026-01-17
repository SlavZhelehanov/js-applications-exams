import { html } from '../../lib/lit-html.min.js';
import { get } from "../../utils/api.js";

function template(songs) {
    return html`
        <section id="mySongsView">
            <div class="background-spotify">
                <div class="song-container">
                    <h1>My Songs</h1>
                    ${0 < songs.length
                            ? songs.map(m => html`<div class="song">
                        <h5>Title: ${m.title}</h5>
                        <h5>Artist: ${m.artist}</h5>
                        <img class="cover" src=${m.imageUrl}/>
                        <p>Likes: ${m.likes}; Listened ${m.listened} times</p>
                        <a href="/delete/${m._id}"><button type="button" class="btn btn-danger mt-4">Remove</button></a>
                        <a href="/listen/${m._id}"><button type="button" class="btn btn-success mt-4">Listen</button></a>
                        <p>Likes: 100</p>
                        <a href="/like/${m._id}"><button type="button" class="btn btn-primary mt-4">Like</button></a>
                    </div>`)
                            : null
                    }
                    <div class="song">
                        <h5>Title: When The Sun Goes Down</h5>
                        <h5>Artist: Zeni N, The Distance, Igi</h5>
                        <img class="cover" src="https://images-na.ssl-images-amazon.com/images/I/51MGXCdrUpL._SS500.jpg"/>
                        <p>Likes: 100; Listened 1500 times</p>
                        <a href="#"><button type="button" class="btn btn-danger mt-4">Remove</button></a>
                        <a href="#"><button type="button" class="btn btn-success mt-4">Listen</button></a>
                        <p>Likes: 100</p>
                        <a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>
                    </div>
                    <div class="song">
                        <h5>Title: Insomnia 2.0 (Avicci Remix)</h5>
                        <h5>Artist: Faithless, Avicci</h5>
                        <img class="cover" src="https://static.qobuz.com/images/covers/58/22/0886445392258_600.jpg"/>
                        <p>Likes: 2000; Listened 100000 times</p>
                        <a href="#"><button type="button" class="btn btn-danger mt-4">Remove</button></a>
                        <a href="#"><button type="button" class="btn btn-success mt-4">Listen</button></a>
                        <p>Likes: 2000</p>
                        <a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>
                    </div>
                    <div class="song">
                        <h5>Title: Coffee Shop</h5>
                        <h5>Artist: Sunnery James & Ryan Marciano</h5>
                        <img class="cover" src="https://images-na.ssl-images-amazon.com/images/I/51RO-2AhZEL._SS500.jpg"/>
                        <p>Likes: 1234; Listened 5000 times</p>
                        <a href="#"><button type="button" class="btn btn-danger mt-4">Remove</button></a>
                        <a href="#"><button type="button" class="btn btn-success mt-4">Listen</button></a>
                        <p>Likes: 1234</p>
                        <a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>
                    </div>
                </div>
            </div>
        </section>`
}

export async function myProfilePage(ctx) {
    let songs = [];

    try {
        songs = await get(`/data/songs?where=_ownerId%3D%22${ctx.userData._id}%22&sortBy=_createdOn%20desc`);
    } catch (err) {
        showError(err.message);
    }

    ctx.render(template(songs));
}