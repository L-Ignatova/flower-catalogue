import {html, render} from 'https://unpkg.com/lit-html?module';

const profileTemplate = (user, name) => html`
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
        <section id="profile-feed">
            <article class="flower-card">
                <img src="/resources/bouquet_4.jpg" alt="flower 1">
                <section class="flower-content">
                    <section class="flower-text">
                        <h4>Majesty palm</h4>
                        <p>$15</p>
                    </section>
                    <section class="flower-details">
                        <button class="details-btn">Details</button>
                    </section>
                </section>
            </article>
            <article class="flower-card">
                <img src="/resources/bouquet_5.jpg" alt="flower 1">
                <section class="flower-content">
                    <section class="flower-text">
                        <h4>Majesty palm</h4>
                        <p>$15</p>
                    </section>
                    <section class="flower-details">
                        <button class="details-btn">Details</button>
                    </section>
                </section>
            </article>
        </section>
        <div id="empty-profile-feed">
            <h2>Nothing to show yet</h2>
        </div>
    </div>
</section>
`;

export async function profilePage(context) {
    const user = { 
        email: sessionStorage.getItem('userEmail'), 
        userId: sessionStorage.getItem('userId'),
        authToken: sessionStorage.getItem('token'),
    };
    const response = await fetch(`https://flower-shop-demo-c4c3b-default-rtdb.firebaseio.com/users/${user.userId}.json`)
    const data = await response.json();
    context.render(profileTemplate(user, data.name));
    context.page.redirect('/profile');
}