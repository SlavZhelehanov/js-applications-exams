import {html} from '../../lib/lit-html.min.js';
import {get} from '../../utils/api.js';

function template(data) {
    return html`
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${0 < data.length
                    ? html`
                        <ul class="my-books-list">
                            ${data.map(book => html`<li class="otherBooks">
                                <h3>${book.title}</h3>
                                <p>Type: ${book.type}</p>
                                <p class="img"><img src=${book.imageUrl}></p>
                                <a class="button" href="/details/${book._id}">Details</a>
                            </li>`)}
                        </ul>`
                    : html`<p class="no-books">No books in database!</p>`
            }
        </section>`;
}

export async function myBooksPage(ctx) {
    let data = [];

    try{
        data = await get(`/data/books?where=_ownerId%3D%22${ctx.userData._id}%22&sortBy=_createdOn%20desc`);
    } catch(err) {
        alert(err.message);
    }

    ctx.render(template(data));
}