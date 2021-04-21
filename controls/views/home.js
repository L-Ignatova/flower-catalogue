import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTemplate = () => html`
<section class="landing-page">
    <video src="/resources/video.mp4" muted loop autoplay poster="/resources/alt-background.jpg"></video>
    <div class="wrapper">
        <section class="main-content">
            <h1>Spring is here</h1>
            <h2>Flowers for every occasion</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem accusantium iusto reiciendis
                veniam.
                Quas aperiam aspernatur, deleniti fugiat est necessitatibus asperiores quaerat molestiae. Illum,
                dolores itaque. Qui magnam consequatur vel?</p>
            <button class="discover-btn"><a href="#">Discover</a></button>
        </section>

        <section class="pause-btn"></section>

        <section class="social-media">
            <ul>
                <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li><a href=""><i class="fab fa-instagram"></i></a></li>
            </ul>
        </section>
    </div>
</section>
`;

export function hopePage(context) {
    context.render(homeTemplate());
    context.setUserNav();
}