import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { login } from "../api/api.js";
import { notify } from "./notification.js";

const loginTemplate = (onSubmit) => html`
<section class="login-page">
    <div class="wrapper">
        <form @submit=${onSubmit} id="login-form" action="login">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" placeholder=" your email...">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" placeholder=" your password...">
            <input type="submit" value="Login">
            <p>Not registered? Not to worry - do that <a href="/register" style="text-decoration: underline">here!</a></p>
            <p style="color:red">Note: Website is for academic purposes. Do not use real email and password!</p>
        </form>
    </div>
</section>
`;

export function loginPage(context) {
    context.render(loginTemplate(onSubmit));


    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            if (!password || !email) {
                throw new Error('All fields are required!');
            }

            await login(email, password);
            context.setUserNav();
            context.page.redirect('/catalog');
        } catch(err) {
            notify(err.message);
        }
        
    }
}