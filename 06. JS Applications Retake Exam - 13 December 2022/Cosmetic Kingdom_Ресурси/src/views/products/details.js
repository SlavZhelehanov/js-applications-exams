import {html} from '../../lib/lit-html.min.js';
import {get, del, post} from '../../utils/api.js';

function template(product, isCreator, onDelete, isLoggedIn, canBuy, goBuy, buys) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img
                        id="details-img"
                        src=${product.imageUrl}
                        alt="example1"
                />
                <p id="details-title">${product.name}</p>
                <p id="details-category">
                    Category: <span id="categories">${product.category}</span>
                </p>
                <p id="details-price">
                    Price: <span id="price-number">${product.price}</span>$
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Bought: <span id="buys">${buys}</span> times.</h4>
                        <span>${product.description}</span>
                    </div>
                </div>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    ${!isLoggedIn
                            ? null
                            : isCreator
                                    ? html`
                                        <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                                    `
                                    : canBuy === 0
                                            ? html`<a @click=${goBuy} href="javascript:void(0)" id="buy-btn">Buy</a>`
                                            : null
                    }
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    const id = ctx.params.id, userId = ctx?.userData?._id
    let product = {}, isCreator = false, isLoggedIn = !!userId, buys = 0, canBuy = false;

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/data/products/${id}`);
                ctx.page.redirect('/products');
            } catch (err) {
                alert(err.message);
            }
        }
    }

    async function goBuy() {
        try {
            await post(`/data/bought`, {productId: id});
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    try {
        product = await get(`/data/products/${id}`);
        buys = await get(`/data/bought?where=productId%3D%22${id}%22&distinct=_ownerId&count`);

        if (userId) {
            canBuy = await get(`/data/bought?where=productId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);
            isCreator = userId === product._ownerId;
        }
    } catch (err) {
        return alert(err.message);
    }

    ctx.render(template(product, isCreator, onDelete, isLoggedIn, canBuy, goBuy, buys));
}