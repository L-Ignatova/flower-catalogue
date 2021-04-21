import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

const container = document.getElementById('container');
setUserNav()

page('/', decorateContext, homePage);
// page('/catalog', decorateContext, catalogPage);
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
        document.getElementById('user').style.display = 'inline-block';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}