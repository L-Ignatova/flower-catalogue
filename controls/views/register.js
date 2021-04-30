import {html} from 'https://unpkg.com/lit-html?module';
import { register as reg } from "../api/api.js";
import { createUserEntry } from '../api/data.js';
import { notify } from './notification.js';


const registerTemplate = (onSubmit) => html`
<section class="register-page">
    <div class="wrapper">
        <form @submit=${onSubmit} id="register-form" action="register">
            <label for="name">Your name:</label>
            <input type="text" name="name" id="name" placeholder=" first and last name...">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" placeholder=" your email...">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" placeholder=" your password...">
            <label for="repass">Repeat password:</label>
            <input type="password" name="repass" id="repass" placeholder=" your password again...">
            <input type="submit" value="Sign up">
        </form>
    </div>
</section>
`;

export function registerPage(context) {
    context.render(registerTemplate(onSubmit));


    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repass').trim();
        
        try { 
            if (!password || !email || !name) {
                throw new Error('All fields are required!');
            } else if (password !== repass) {
                throw new Error('Passwords don\'t match!')
            } else if (password.length < 6) {
                throw new Error('Password should be at least 6 characters long!')
            }

            const isOk = await reg(email, password);
            if (isOk) {
                await createUserEntry(email, name, isOk.localId);
            }
            context.setUserNav();
            context.page.redirect('/catalog');
        } catch(err) {
            notify(err.message);
        }
    }
}