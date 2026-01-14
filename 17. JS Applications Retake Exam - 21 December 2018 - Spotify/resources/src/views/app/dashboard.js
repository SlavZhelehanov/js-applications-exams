import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

function template(data, isAuth) {
    return html`
        <section id="allSongsView">
            <div class="background-spotify">
                <div class="song-container">
                    <h1>All Songs</h1>
                    <a href="/create">
                        <button type="button" class="btn-lg btn-block new-song-btn">Add a new song</button>
                    </a>
                    ${0 < data.length
                            ? data.map(m => html`<div class="song">
                        <h5>Title: ${m.title}</h5>
                        <h5>Artist: ${m.artist}</h5>
                        <img class="cover" src=${m.imageUrl}/>

                                ${isAuth?._id === m._ownerId
                                ? html`<p>Likes: 100; Listened 1500 times</p>
                        <a href="#"><button type="button" class="btn btn-danger mt-4">Remove</button></a>
                        <a href="#"><button type="button" class="btn btn-success mt-4">Listen</button></a>`
                        : html`<p>Likes: 100</p>
                        <a href="#"><button type="button" class="btn btn-primary mt-4">Like</button></a>`
                            })
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
        </section>`;
}

export async function dashboardPage(ctx) {
    const isAuth = ctx.userData;
    let data = [];

    try {
        data = await get('/data/songs?sortBy=_createdOn%20desc');
    } catch (err) {
        console.log(err.message);
    }

    ctx.render(template(data, isAuth));
}