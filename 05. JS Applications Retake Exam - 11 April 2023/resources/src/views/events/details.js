import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src="./images/large_deniroparty_marquee.jpg" alt="example1"/>
                <p id="details-title">Robert De Niro Themed Party</p>
                <p id="details-category">
                    Category: <span id="categories">Fun</span>
                </p>
                <p id="details-date">
                    Date:<span id="date">15.04.2023 from 17:00</span></p>
                <div id="info-wrapper">
                    <div id="details-description">
                <span
                >Welcome to the ultimate Robert De Niro themed party! If you're a fan of this legendary actor's films and characters, then this is the party for you.
                  Entertainment can include a De Niro movie trivia game, a dance-off to classic songs from his films, and even an impression contest where guests can try their best De Niro impressions.
                  End the night with a screening of one of De Niro's greatest films, followed by a toast to the man himself. Your guests will be talking about this unforgettable party for years to come!</span>
                    </div>

                </div>

                <h3>Going: <span id="go">0</span> times.</h3>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    <a href="" id="edit-btn">Edit</a>
                    <a href="" id="delete-btn">Delete</a>

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a href="" id="go-btn">Going</a>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}