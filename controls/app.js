import {html, render} from '../node_modules/lit-html/lit-html.js';
import page from "https://unpkg.com/page/page.mjs";
import { logout } from "../controls/api/api.js";
import { homePage } from "../controls/views/home.js";
import { cataloguePage } from "../controls/views/feed.js";
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { profilePage } from './views/profile.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';

const container = document.getElementById('container');
document.getElementById('logoutBtn').addEventListener('click', async (ev) => {
    ev.preventDefault();
    await logout();
    page.redirect('/');
    setUserNav();
})
setUserNav()

page('/', decorateContext, homePage);
page('/index.html', decorateContext, homePage);
page('/catalog', decorateContext, cataloguePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/add', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);
page.start()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'flex';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'flex';
    }
}