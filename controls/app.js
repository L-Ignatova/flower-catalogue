import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

const container = document.getElementById('container');

// page('/', decorateContext, homePage);
// page('/catalog', decorateContext, catalogPage);
// page('/login', decorateContext, loginPage);
// page('/register', decorateContext, registerPage);
// page('/add', decorateContext, addPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/edit/:id', decorateContext, editPage);
// page('/profile', decorateContext, myListingsPage);
// page.start()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}