import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { getFlowers } from "../api/data.js";

const profileTemplate = (user, name, userFlowers) => html`
<section class="profile">
    <div class="wrapper">
        <section class="profile-info">
            <img src="/resources/profile.jpg" alt="">
            <ul class="profile-details">
                <li><span>Email: </span> ${user.email}</li>
                <li><span>Name: </span> ${name}</li>
                <button class="add-new-flower"><a href="/add">Add flower</a></button>
            </ul>
        </section>
        <h1 class="title">Your garden:</h1>
        ${userFlowers.length == 0 
            ? html`
            <div id="empty-profile-feed">
                <h2>Nothing to show yet</h2>
            </div>
            ` 
            : userFlowers.map(x => flowerCard(x[0], x[1]))}

        
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

export async function profilePage(context) {
    const user = { 
        email: sessionStorage.getItem('userEmail'), 
        userId: sessionStorage.getItem('userId'),
        authToken: sessionStorage.getItem('token'),
    };
    const response = await fetch(`https://flower-shop-demo-c4c3b-default-rtdb.firebaseio.com/users/${user.userId}.json`)
    const data = await response.json();

    const allFlowers = await getFlowers();
    const userFlowers = Object.entries(allFlowers).filter(([key, val]) => val.creator === user.userId);
    context.render(profileTemplate(user, data.name, userFlowers));
}