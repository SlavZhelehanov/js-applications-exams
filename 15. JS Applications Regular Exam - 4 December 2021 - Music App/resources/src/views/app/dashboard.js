import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="catalogPage">
            <h1>All Albums</h1>

            <div class="card-box">
                <img src="./images/BrandiCarlile.png">
                <div>
                    <div class="text-center">
                        <p class="name">Name: In These Silent Days</p>
                        <p class="artist">Artist: Brandi Carlile</p>
                        <p class="genre">Genre: Low Country Sound Music</p>
                        <p class="price">Price: $12.80</p>
                        <p class="date">Release Date: October 1, 2021</p>
                    </div>
                    <div class="btn-group">
                        <a href="#" id="details">Details</a>
                    </div>
                </div>
            </div>

            <div class="card-box">
                <img src="./images/pinkFloyd.jpg">
                <div>
                    <div class="text-center">
                        <p class="name">Name: The Dark Side of the Moon</p>
                        <p class="artist">Artist: Pink Floyd</p>
                        <p class="genre">Genre: Rock Music</p>
                        <p class="price">Price: $28.75</p>
                        <p class="date">Release Date: March 1, 1973</p>
                    </div>
                    <div class="btn-group">
                        <a href="#" id="details">Details</a>
                    </div>
                </div>
            </div>

            <div class="card-box">
                <img src="./images/Lorde.jpg">
                <div>
                    <div class="text-center">
                        <p class="name">Name: Melodrama</p>
                        <p class="artist">Artist: Lorde</p>
                        <p class="genre">Genre: Pop Music</p>
                        <p class="price">Price: $7.33</p>
                        <p class="date">Release Date: June 16, 2017</p>
                    </div>
                    <div class="btn-group">
                        <a href="#" id="details">Details</a>
                    </div>
                </div>
            </div>

            <!--No albums in catalog-->
            <p>No Albums in Catalog!</p>

        </section>`;
}

export async function dashboardPage(ctx) {
    ctx.render(template());
}