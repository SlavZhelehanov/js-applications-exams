import { html } from "../../lib/lit-html.min.js";
import { getUserData } from "../../utils/utils.js";
import { get } from "../../utils/api.js";

function template() {
    return html`
        <div class="container home wrapper  my-md-5 pl-md-5">
            <div class="d-md-flex flex-md-equal ">
                <div class="col-md-5">
                    <img class="responsive" src="./images/01.svg" />
                </div>
                <div class="home-text col-md-7">
                    <h2 class="featurette-heading">Do you wonder if your idea is good?</h2>
                    <p class="lead">Join our family =)</p>
                    <p class="lead">Post your ideas!</p>
                    <p class="lead">Find what other people think!</p>
                    <p class="lead">Comment on other people's ideas.</p>
                </div>
            </div>
            <div class="bottom text-center">
                <a class="btn btn-secondary btn-lg " href="/login">Get Started</a>
            </div>
        </div>`;
}

function dashboard(data) {
    return html`
        <div id="dashboard-holder">
        ${0 < data.length
            ? data.map(dish => html`<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                <div class="card-body">
                    <p class="card-text">${dish.title}</p>
                </div>
                <img class="card-image" src=${dish.imageURL} alt="Card image cap">
                <a class="btn" href="/${dish.dishId}/details">Details</a>
            </div>`)
            : html`<h1>No ideas yet! Be the first one :)</h1>`
        }
        </div>
        `;
}

export async function homePage(ctx) {
    const isAuth = getUserData();
    let data = [];

    if (isAuth) {
        try {
            data = await get("/app");
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }

        ctx.render(dashboard(data));
    } else {
        ctx.render(template());
    }
}