import {html} from 'https://unpkg.com/lit-html?module';
import { getFlowers } from "../api/data.js";

const catalogueTemplate = (flowers) => html`
<section class="feed">
    <div class="wrapper">
        ${flowers.length == 0 
                ? html`<p>No flowers in database.</p>` 
                : Object.entries(flowers).map(([k, val]) => flowerCard(k, val))}
    </div>
</section>
`;

const flowerCard = (flowerKey, values) => html`
<article class="flower-card">
    <img src="${values.imageUrl}" alt="${values.name}">
    <section class="flower-content">
        <section class="flower-text">
            <h4>${values.name}</h4>
            <p>$${values.price.medium}</p>
        </section>
        <section class="flower-details">
            <button class="details-btn"><a href="/details/${flowerKey}">Details</a></button>
        </section>
    </section>
</article>
`;

export async function cataloguePage(context) {
    const flowers = await getFlowers();
    console.log(flowers);
    context.render(catalogueTemplate(flowers));
}