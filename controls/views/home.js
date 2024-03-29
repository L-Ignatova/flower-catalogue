import {html, render} from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = (clickToggle) => html`
<section class="landing-page">
    <video src="/resources/video.mp4" muted loop autoplay poster="/resources/alt-background.jpg"></video>
        <section class="main-content">
            <h1>Spring is here</h1>
            <h2>Flowers for every occasion</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem accusantium iusto reiciendis
                veniam.
                Quas aperiam aspernatur, deleniti fugiat est necessitatibus asperiores quaerat molestiae. Illum,
                dolores itaque. Qui magnam consequatur vel?</p>
            <button class="discover-btn"><a href="/catalog">Discover</a></button>
        </section>

        <section @click=${clickToggle} class="pause-btn"></section>

        <section class="social-media">
            <ul>
                <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li><a href=""><i class="fab fa-instagram"></i></a></li>
            </ul>
        </section>
</section>
`;

export function homePage(context) {
    context.render(homeTemplate(clickToggle));
    context.setUserNav();

    function clickToggle(ev) {
        const playToggle = document.querySelector('.pause-btn');
        const videoElement = document.querySelector('video');
        playToggle.classList.toggle('active');
        videoElement.paused ? videoElement.play() : videoElement.pause();
    }
}