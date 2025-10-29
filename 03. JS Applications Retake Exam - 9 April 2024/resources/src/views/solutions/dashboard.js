import {html} from "../../../node_modules/lit-html/lit-html.js";
import {getAllSolutions} from "../../services/solutionsService.js";

function template(solutions) {
    return html`
        ${0 < solutions.length
                ? html`<h2>Solutions</h2>
<section id="solutions">
${solutions.map(solution => html`
                    <div class="solution">
                        <img src=${solution.imageUrl} alt="example1"/>
                        <div class="solution-info">
                            <h3 class="type">${solution.type}</h3>
                            <p class="description">${solution.description}</p>
                            <a class="details-btn" href="/details/${solution._id}">Learn More</a>
                        </div>
                    </div>`
                )}
</section>`
                : html`<h2 id="no-solution">No Solutions Added.</h2>`}

        }
    `;
}

export async function dashboardPage(ctx) {
    const solutions = await getAllSolutions();

    ctx.render(template(solutions));
}