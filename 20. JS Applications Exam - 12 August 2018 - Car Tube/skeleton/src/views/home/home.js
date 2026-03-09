import {html} from "../../lib/lit-html.min.js";

function homeTemplate() {
    return html`
        <div id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img src="./style/images/finance-car.png" alt="carIntro">
                <h2>Login or register to check out our listings or to make one</h2>
                <div id="button-div">
                    <a href="/login" class="button">Login</a>
                    <a href="/register" class="button">Register</a>
                </div>
            </div>
        </div>`;
}

function dashboardTemplate() {
    return html`
        <div id="car-listings">
            <h1>Car Listings</h1>

            <div id="listings">

                <div class="listing">
                    <p>Audi a3 много запазено</p>
                    <img src="https://i.imgur.com/drIOsYl.jpg">
                    <h2>Brand: Audi</h2>
                    <div class="info">
                        <div id="data-info">
                            <h3>Seller: kunio</h3>
                            <h3>Fuel: Gasoline</h3>
                            <h3>Year: 1998</h3>
                            <h3>Price: 2500 $</h3>
                        </div>
                        <div id="data-buttons">
                            <ul>
                                <li class="action">
                                    <a href="#" class="button-carDetails">Details</a>
                                </li>
                                <li class="action">
                                    <a href="#" class="button-carDetails">edit</a>
                                </li>
                                <li class="action">
                                    <a href="#" class="button-carDetails">delete</a>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>
                <p class="no-cars">No cars in database.</p>

            </div>
        </div>`;
}

export async function homePage(ctx) {
    const isAuth = !!ctx.userData;

    if (!isAuth) {
        return ctx.render(homeTemplate());
    }

    ctx.render(dashboardTemplate());
}