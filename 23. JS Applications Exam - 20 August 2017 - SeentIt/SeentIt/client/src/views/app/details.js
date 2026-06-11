import { html } from "../../lib/lit-html.min.js";
import { get, del } from "../../utils/api.js";
import { calcTime } from "../../utils/utils.js";

function template({ post, onPostDelete, comments }) {
    return html`
        <section id="viewComments">
            <div class="post">
                <div class="col thumbnail">
                    <a href=${post?.url}>
                        <img src=${post?.imageUrl}>
                    </a>
                </div>
                <div class="post-content">
                    <div class="title">
                        <a href=${post?.url}>
                            ${post?.title}
                        </a>
                    </div>
                    <div class="details">
                        <p>${post?.description}</p>
                        <div class="info">
                            submitted ${calcTime(post?.createdAt)} ago by ${post?.author}
                        </div>
                        <div class="controls">
                            <ul>
                                <li class="action"><a class="editLink" href="/edit/${post?.postId}">edit</a></li>
                                <li class="action"><a class="deleteLink" @click=${() => onPostDelete(post?.postId)} href="#">delete</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="post post-content">
                <form id="commentForm">
                    <label>Comment</label>
                    <textarea name="content" type="text"></textarea>
                    <input type="submit" value="Add Comment" id="btnPostComment">
                </form>
            </div>
            ${0 < comments.length
            ? comments.map(cm => html`<article class="post post-content">
                <p>${cm.content}</p>
                <div class="info">
                    submitted ${calcTime(cm.createdAt)} ago by ${cm.author} | <a href="#" class="deleteLink">delete</a>
                </div>
            </article>`)
            : html`<h3>There are no comments yet</h3>`
        }
        </section>`;
}

export async function detailsPage(ctx) {
    const { id } = ctx.params;
    let post = {}, comments = [];

    async function onPostDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await del(`/app/post/${id}`);
            ctx.page.redirect('/');
        }
    }

    try {
        post = await get(`/app/post/${id}`);
        comments = await get(`/app/post/${id}/comments`);
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    return ctx.render(template({ post, comments, onPostDelete }));
}