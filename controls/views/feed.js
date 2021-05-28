import {html} from '../../node_modules/lit-html/lit-html.js';
import { defaultDatabase } from "../api/config.js";
import { notify } from "./notification.js";

const catalogueTemplate = (flowers, onLoadMore) => html`
<section class="feed">
    <div class="wrapper">
        ${flowers.length == 0 
                ? html`<p>No flowers in database.</p>` 
                : Object.entries(flowers).map(([k, val]) => flowerCard(k, val))}
        <button @click=${onLoadMore} style="margin:50px; padding: 15px 20px">Load more flowers</button>
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
        <section id="${flowerKey}" class="flower-details">
            <button class="details-btn"><a href="/details/${flowerKey}">Details</a></button>
        </section>
    </section>
</article>
`;

export async function cataloguePage(context) {
    const size = 3;
    let startingIndex = "0";
    let dict = {};
    
    let query = defaultDatabase.ref('flowers').orderByKey().startAt(startingIndex).limitToFirst(size);
    await query.once("value")
        .then((snapshot) => {
            snapshot.forEach((childrenShap) => {
                dict[childrenShap.key] = childrenShap.val()
            })
    });
    context.render(catalogueTemplate(dict, onLoadMore));
    startingIndex = Object.keys(dict)[Object.keys(dict).length - 1];

    async function onLoadMore(ev) {
        let initialLength = Object.keys(dict).length;
        query = defaultDatabase.ref('flowers').orderByKey().startAt(startingIndex).limitToFirst(size+1);
        await query.once("value")
            .then((snapshot) => {
                snapshot.forEach((childrenShap) => {
                    dict[childrenShap.key] = childrenShap.val()
                })
        });
        if (initialLength == Object.keys(dict).length) {
            notify("No more flowers to load");
        } else {
            context.render(catalogueTemplate(dict, onLoadMore));
            startingIndex = Object.keys(dict)[Object.keys(dict).length - 1];
        }
        
    }
}