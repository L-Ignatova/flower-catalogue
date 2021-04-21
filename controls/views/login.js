import {html, render} from 'https://unpkg.com/lit-html?module';

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


    function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (!password || !email) {
            return alert('All fields are required!');
        }

        console.log(email, password);
        context.setUserNav();
        context.page.redirect('/catalog');
    }
}