import { html } from "../../lib/lit-html.min.js";

function template(data, onDelete) {
    return html`<div class="container home some">
            <img class="det-img" src="./images/dinner.jpg" />
            <div class="desc">
                <h2 class="display-5">Dinner Recipe</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a
                    long
                    day. With so many easy pasta recipes out there, there's something for every palate to love. That's
                    why
                    pasta
                    makes such a quick, easy dinner for your family—it's likely to satisfy everyone's cravings, due to
                    its
                    versatility.</p>
                <p class="infoType">Likes: <large>2</large>
                </p>
                <p class="infoType">Comments:</p>
                <ul>
                    <li class="comment">Jonh: I really like this idea :)</li>
                    <li class="comment">No comments yet :(</li>
                </ul>
            </div>
            <div class="text-center">
                <a class="btn detb" href="">Delete</a>
            </div>
            <form class="text-center" method="" action="">
                <textarea class="textarea-det" name="newComment" id=""></textarea>
                <button type="submit" class="btn detb">Comment</button>
                <a class="btn detb" href="">Like</a>
            </form>
        </div>    `;
}

export async function detailsPage(ctx) {
    return ctx.render(template());
}