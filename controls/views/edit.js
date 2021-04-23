import {html} from 'https://unpkg.com/lit-html?module';
import { editFlower } from "../api/data.js";

const editTemplate = (onSubmit) => html`
<section class="add-flower-page">
    <div class="wrapper">
        <form @submit=${onSubmit} id="add-flower-form" action="add">
            <label for="flower-name">Flower name:</label>
            <input type="text" name="name" id="name" placeholder=" flower name...">
            <label for="stems">Stems:</label>
            <input type="text" name="stems" id="stems" placeholder=" list stems with commas...">
            <label for="stems">Image url:</label>
            <input type="text" name="imageUrl" id="imageUrl" placeholder=" place image url...">
            <label for="height">Height:</label>
            <input type="number" name="height" id="height" placeholder=" height in cm...">
            <label for="small">Price for small size:</label>
            <input type="number" name="small" id="small">
            <label for="medium">Price for medium size:</label>
            <input type="number" name="medium" id="medium">
            <label for="big">Price for big size:</label>
            <input type="number" name="big" id="big">
            
            <input type="submit" value="Add flower" id="add-flower-btn">
        </form>
    </div>
</section>
`;

export async function editPage(context) {
    context.render(editTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const name = formData.get('name');
        const stems = formData.get('stems');
        const imageUrl = formData.get('imageUrl');
        const height = Number(formData.get('height'));
        const small = Number(formData.get('small'));
        const medium = Number(formData.get('medium'));
        const big = Number(formData.get('big'));
        const userId = sessionStorage.getItem('userId');

        if (!name || !stems || !imageUrl || !height || !small || !medium || !big) {
            return alert('All fields are required!');
        }

        await createFlower({ name, stems, imageUrl, height, small, medium, big }, userId);
        context.page.redirect('/profile');
    }
}