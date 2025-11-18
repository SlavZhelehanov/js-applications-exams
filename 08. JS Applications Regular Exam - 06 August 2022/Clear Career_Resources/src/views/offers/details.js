import {html} from '../../lib/lit-html.min.js';

function template() {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src="./images/example2.png" alt="example1"/>
                <p id="details-title">Senior Frontend Software Engineer</p>
                <p id="details-category">
                    Category: <span id="categories">IT, Developer, WEB</span>
                </p>
                <p id="details-salary">
                    Salary: <span id="salary-number">7000</span>
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Description</h4>
                        <span
                        >We are looking for programmers with a keen eye for design for
                  the position of front end developer. Front end developers are
                  responsible for ensuring the alignment of web design and user
                  experience requirements, optimizing web pages for maximum
                  efficiency, and maintaining brand consistency across all web
                  pages, among other duties.</span
                        >
                    </div>
                    <div id="details-requirements">
                        <h4>Requirements</h4>
                        <span
                        >Degree in computer science or related field. Understanding of
                  key design principles. Proficiency in HTML, CSS, JavaScript.
                  Experience with responsive and adaptive design. Good
                  problem-solving skills. Excellent verbal communication skills.
                  Good interpersonal skills.</span
                        >
                    </div>
                </div>
                <p>Applications: <strong id="applications">1</strong></p>

                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    <a href="" id="edit-btn">Edit</a>
                    <a href="" id="delete-btn">Delete</a>

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a href="" id="apply-btn">Apply</a>
                </div>
            </div>
        </section>`;
}

export async function detailsPage(ctx) {
    ctx.render(template());
}