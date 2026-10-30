import { html } from "../../lib/lit-html.min.js";
import { getUserData } from "../../utils/utils.js";
import { get, post } from "../../utils/api.js";

function template({ onSearch, data, isAuth }) {
    return html`
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
            <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
                class="img-fluid" alt="Responsive image">
            <h1 class="display-4">Movies</h1>
            <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
        </div>
        ${isAuth
            ? html`<h1 class="text-center">Movies</h1>
        <section>
            <a href="/create" class="btn btn-warning ">Add Movie</a>
            <form class="search float-right" @submit=${onSearch} method="post">
                <label>Search: </label>
                <input type="text" name="title">
                <input type="submit" class="btn btn-info" value="Search">
            </form>
        </section>
            ${data.length === 0
                    ? html`<h3>No movies...</h3>`
                    : html`<div class=" mt-3 ">
            <div class="row d-flex d-wrap">

                <div class="card-deck d-flex justify-content-center">
                    ${data.map(movie => html`<div class="card mb-4">
                        <img class="card-img-top" src=${movie.imageUrl} alt=${movie.title} width="400">
                        <div class="card-body">
                            <h4 class="card-title">${movie.title}</h4>
                        </div>
                        <div class="card-footer">
                            <a href="/${movie.movieId}/details"><button type="button" class="btn btn-info">Details</button></a>
                        </div>
                    </div>`)}
                </div>
            </div>
        </div>`
                }
        `
            : null
        }`;
}

export async function homePage(ctx) {
    const isAuth = !!getUserData();
    let data = [];

    async function onSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');


        try {
            if (title.trim() === '') data = await get(`/app`);
            else data = await post("/app/search", { title });

            if (399 < data.status) throw data.statusText;

            e.target.reset();
            ctx.render(template({ isAuth, data, onSearch }));
        } catch (err) {
            alert(err.message || err);
        }
    }

    if (isAuth) {
        try {
            data = await get(`/app`);
        } catch (err) {
            alert(err.message || err);
        }
    }

    ctx.render(template({ isAuth, data, onSearch }));
}