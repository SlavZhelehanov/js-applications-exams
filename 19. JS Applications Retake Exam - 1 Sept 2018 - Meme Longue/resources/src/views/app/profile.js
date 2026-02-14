import { html } from '../../lib/lit-html.min.js';

function template() {
    return html`
        <div class="user-profile">
            <img id="user-avatar-url" src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                 alt="user-profile">
            <h1>user</h1>
            <h2>user@abv.bg</h2>

            <a id="deleteUserButton" href="#">DELETE USER!</a>

            <p id="user-listings-title">User Memes
            </p>
            <div class="user-meme-listings">
                <div class="user-meme">
                    <a href="#" class="user-meme-title">Разбираемо...</a>
                    <a href=""> <img class="userProfileImage"
                                     src="https://scontent.fsof3-1.fna.fbcdn.net/v/t1.0-9/31924539_2110321352572189_5652160133854134272_n.jpg?_nc_cat=0&oh=dc73aad9af411f76454dd70ea1ab2775&oe=5C2FB35A"></a>

                    <div class="user-memes-buttons">

                        <a href="#" class="user-meme-btn">Edit</a>
                        <a href="#" class="user-meme-btn">Delete</a>

                    </div>
                </div>
                <p class="no-memes">No memes in database.</p>
            </div>
        </div>`;
}

export async function profilePage(ctx) {
    ctx.render(template());
}