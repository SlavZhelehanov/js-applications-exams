import { html } from "../../lib/lit-html.min.js";

function template(data) {
    return html`
        <section class="welcomePage">
            <div id="welcomeMessage">
                <h1>My Theater</h1>
                <p>Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI Cooperating Members, theatre
                    professionals, theatre organizations, theatre universities and theatre lovers all over the world on
                    the 27th of March. This day is a celebration for those who can see the value and importance of the
                    art
                    form “theatre”, and acts as a wake-up-call for governments, politicians and institutions which have
                    not
                    yet recognised its value to the people and to the individual and have not yet realised its potential
                    for
                    economic growth.</p>
            </div>
            <div id="events">
                <h1>Future Events</h1>
                <div class="theaters-container">

                    <!--Created Events-->
                    <div class="eventsInfo">
                        <div class="home-image">
                            <img src="./images/Pretty-Woman.jpg">
                        </div>
                        <div class="info">
                            <h4 class="title">Pretty Woman - The Musical</h4>
                            <h6 class="date">March 13, 2018</h6>
                            <h6 class="author">J. F. Lawton, Garry Marshall</h6>
                            <div class="info-buttons">
                                <a class="btn-details" href="#">Details</a>
                            </div>
                        </div>
                    </div>

                    <div class="eventsInfo">
                        <div class="home-image">
                            <img src="./images/Moulin-Rouge!-The-Musical.jpg">
                        </div>
                        <div class="info">
                            <h4 class="title">Moulin Rouge! - The Musical</h4>
                            <h6 class="date">July 10, 2018</h6>
                            <h6 class="author">Baz Luhrmann, Craig Pearce</h6>
                            <div class="info-buttons">
                                <a class="btn-details" href="#">Details</a>
                            </div>
                        </div>
                    </div>

                    <div class="eventsInfo">
                        <div class="home-image">
                            <img src="./images/To-kill-a-mockingbird.jpg">
                        </div>
                        <div class="info">
                            <h4 class="title">To Kill A Mockingbird</h4>
                            <h6 class="date">December 13, 2018</h6>
                            <h6 class="author">Aaron Sorkin, Fred Fordham</h6>
                            <div class="info-buttons">
                                <a class="btn-details" href="#">Details</a>
                            </div>
                        </div>
                    </div>

                    <!--No Theaters-->
                    <h4 class="no-event">No Events Yet...</h4>
                </div>
            </div>
        </section>`;
}

export async function homePage(ctx) {
    ctx.render(template());
}