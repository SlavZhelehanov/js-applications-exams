import {html} from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";

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

function carListings({ cars, isAuth, onDelete }) {
    return html`
        <div id="car-listings">
            <h1>Car Listings</h1>

            <div id="listings">
                ${0 < cars.length
                        ? cars.map(c => html`
                            <div class="listing">
                                <p>${c.title}</p>
                                <img src=${c.imageUrl}>
                                <h2>Brand: ${c.brand}</h2>
                                <div class="info">
                                    <div id="data-info">
                                        <h3>Seller: ${c.seller}</h3>
                                        <h3>Fuel: ${c.fuelType}</h3>
                                        <h3>Year: ${c.year}</h3>
                                        <h3>Price: ${c.price} $</h3>
                                    </div>
                                    <div id="data-buttons">
                                        <ul>
                                            <li class="action">
                                                <a href="/details/${c._id}" class="button-carDetails">Details</a>
                                            </li>
                                            ${isAuth._id === c._id
                                                    ? html`
                                                        <li class="action">
                                                            <a href="/edit/${c._id}" class="button-carDetails">edit</a>
                                                        </li>
                                                        <li class="action">
                                                            <a @click=${() => onDelete(c._id)} href="javascript:void(0)" class="button-carDetails">delete</a>
                                                        </li>`
                                                    : null
                                            }
                                        </ul>
                                    </div>
                                </div>

                            </div>`)
                        : html`<p class="no-cars">No cars in database.</p>`
                }
            </div>
        </div>`;
}

export async function homePage(ctx) {
    const isAuth = !!ctx.userData;

    if (!isAuth) {
        return ctx.render(homeTemplate());
    }

    let cars = [];

    async function onDelete(id) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/memes/${id}`);
                ctx.page.redirect('/app');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }
    }

    try {
        cars = await get('/data/cars?sortBy=_createdOn%20desc');
    } catch (error) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    return ctx.render(carListings({ cars, isAuth, onDelete }));
}