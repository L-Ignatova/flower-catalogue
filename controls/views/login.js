import {html, render} from 'https://unpkg.com/lit-html?module';
import { login } from "../api/api.js";

const loginTemplate = (onSubmit) => html`
<section class="login-page">
    <div class="wrapper">
        <form @submit=${onSubmit} id="login-form" action="login">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" placeholder=" your email...">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" placeholder=" your password...">
            <input type="submit" value="Login">
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

        if (!password || !email) {
            return alert('All fields are required!');
        }

        await login(email, password);

        context.setUserNav();
        context.page.redirect('/catalog');
    }
}