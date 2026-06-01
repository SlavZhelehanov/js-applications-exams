import { html } from "../../lib/lit-html.min.js";

function template() {
    return html`
        <section id="viewComments">
            <div class="post">
                <div class="col thumbnail">
                    <a href="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                        <img src="src/RuditoFreshStep.jpg">
                    </a>
                </div>
                <div class="post-content">
                    <div class="title">
                        <a href="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                            Sammy Docs
                        </a>
                    </div>
                    <div class="details">
                        <p>Very helpful and complete info. Even includes a detailed tutorial.</p>
                        <div class="info">
                            submitted 5 days ago by pesho
                        </div>
                        <div class="controls">
                            <ul>
                                <li class="action"><a class="editLink" href="#">edit</a></li>
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
    return ctx.render(template());
}