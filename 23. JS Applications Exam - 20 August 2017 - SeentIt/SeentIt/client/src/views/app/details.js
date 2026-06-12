import { html } from "../../lib/lit-html.min.js";
import { get, del, post as pst } from "../../utils/api.js";
import { calcTime, getUserData } from "../../utils/utils.js";

function template({ onComment, post, onPostDelete, comments, onCommentDelete, userId }) {
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
                                <li class="action"><a class="deleteLink" @click=${onPostDelete} href="#">delete</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="post post-content">
                <form id="commentForm" method='post' @submit=${onComment}>
                    <label>Comment</label>
                    <textarea name="content" type="text"></textarea>
                    <input type="submit" value="Add Comment" id="btnPostComment">
                </form>
            </div>
            ${0 < comments.length
            ? comments.map(cm => html`<article class="post post-content">
                <p>${cm.content}</p>
                <div class="info">
                    submitted ${calcTime(cm.createdAt)} ago by ${cm.author} 
                    ${userId === cm.creator
                    ? html`| <a @click=${() => onCommentDelete(cm?.commentId)} href="#" class="deleteLink">delete</a>`
                    : null
                }                    
                </div>
            </article>`)
            : html`<h3>There are no comments yet</h3>`
        }
        </section>`;
}

export async function detailsPage(ctx) {
    const { id } = ctx.params, { id: userId } = getUserData();
    let post = {}, comments = [];

    async function onPostDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/app/post/${id}`);
                ctx.page.redirect('/');
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }
    }

    async function onCommentDelete(commentId) {
        const choice = confirm('Are you sure?');

        if (choice) {
            try {
                await del(`/app/post/${id}/${commentId}`);
                ctx.page.redirect(`/details/${id}`);
            } catch (err) {
                if (err.message) alert(err.message);
                else alert(err);
            }
        }
    }

    async function onComment(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const comment = formData.get('content');

        try {
            await pst(`/app/post/${id}/comments`, { comment: comment });
            e.target.reset();
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            if (err.message) alert(err.message);
            else alert(err);
        }
    }

    try {
        [post, comments] = await Promise.all([get(`/app/post/${id}`), get(`/app/post/${id}/comments`)]);
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    return ctx.render(template({ post, comments, onCommentDelete, onComment, onPostDelete, userId }));
}