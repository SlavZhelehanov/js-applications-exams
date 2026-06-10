import { html } from "../../lib/lit-html.min.js";
import { get } from "../../utils/api.js";
import { calcTime } from "../../utils/utils.js";

function template(post) {
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
                                <li class="action"><a class="deleteLink" href="#">delete</a></li>
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
            <article class="post post-content">
                <p>Thanks, just what I needed.</p>
                <div class="info">
                    submitted 5 days ago by Gosho | <a href="#" class="deleteLink">delete</a>
                </div>
            </article>
            <article class="post post-content">
                <p>Tutorial is kinda outdated, but it works.</p>
                <div class="info">
                    submitted 4 days ago by Kiril | <a href="#" class="deleteLink">delete</a>
                </div>
            </article>
            <article class="post post-content">
                <p>Beats React any day! So must easier and less boilerplate.</p>
                <div class="info">
                    submitted 3 days ago by Nakov | <a href="#" class="deleteLink">delete</a>
                </div>
            </article>
        </section>`;
}

export async function detailsPage(ctx) {
    const {id} = ctx.params;
    let post = {};

    try {
        post = await get(`/app/post/${id}`);
        // console.log(post);        
    } catch (err) {
        if (err.message) alert(err.message);
        else alert(err);
    }

    return ctx.render(template(post));
}