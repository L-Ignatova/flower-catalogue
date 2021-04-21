import {html, render} from 'https://unpkg.com/lit-html?module';

const catalogueTemplate = () => html`
<section class="feed">
    <div class="wrapper">
        <article class="flower-card">
            <img src="/resources/bouquet_1.jpg" alt="flower 1">
            <section class="flower-content">
                <section class="flower-text">
                    <h4>Majesty palm</h4>
                    <p>$15</p>
                </section>
                <section class="flower-details">
                    <button class="details-btn"><a href="#">Details</a></button>
                </section>
            </section>
        </article>
        <article class="flower-card">
            <img src="/resources/bouquet_2.jpg" alt="flower 1">
            <section class="flower-content">
                <section class="flower-text">
                    <h4>Majesty palm</h4>
                    <p>$15</p>
                </section>
                <section class="flower-details">
                    <button class="details-btn"><a href="#">Details</a></button>
                </section>
            </section>
        </article>
        <article class="flower-card">
            <img src="/resources/bouquet_3.jpg" alt="flower 1">
            <section class="flower-content">
                <section class="flower-text">
                    <h4>Majesty palm</h4>
                    <p>$15</p>
                </section>
                <section class="flower-details">
                    <button class="details-btn"><a href="#">Details</a></button>
                </section>
            </section>
        </article>
    </div>
</section>
`;

export function cataloguePage(context) {
    context.render(catalogueTemplate())

}