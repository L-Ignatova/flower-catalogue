import {html, render} from 'https://unpkg.com/lit-html?module';
import page from "https://unpkg.com/page/page.mjs";
import { homePage } from "../controls/views/home.js";
import { cataloguePage } from "../controls/views/feed.js";

const container = document.getElementById('container');
setUserNav()

page('/', decorateContext, homePage);
page('/catalog', decorateContext, cataloguePage);
// page('/login', decorateContext, loginPage);
// page('/register', decorateContext, registerPage);
// page('/add', decorateContext, addPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/edit/:id', decorateContext, editPage);
// page('/profile', decorateContext, myListingsPage);
page.start()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'flex';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'flex';
    }
}