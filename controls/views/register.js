import {html} from 'https://unpkg.com/lit-html?module';

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


    function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repass').trim();

        if (!password || !email || !name) {
            return alert('All fields are required!');
        } else if (password !== repass) {
            return alert('Passwords don\'t match!')
        }

        console.log(email, password);
        context.setUserNav();
        context.page.redirect('/catalog');
    }
}