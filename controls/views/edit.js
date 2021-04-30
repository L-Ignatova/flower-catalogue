import {html} from 'https://unpkg.com/lit-html?module';
import { editFlower, getFlowerById } from "../api/data.js";
import { notify } from './notification.js';

const editTemplate = (flower, onSubmit) => html`
<section class="edit-flower-page">
    <div class="wrapper">
        <form @submit=${onSubmit} id="add-flower-form" action="add">
            <label for="flower-name">Flower name:</label>
            <input type="text" name="name" id="name" placeholder=" flower name..." .value="${flower.name}">
            <label for="stems">Stems:</label>
            <input type="text" name="stems" id="stems" placeholder=" list stems with commas..." .value="${flower.stems}">
            <label for="stems">Image url:</label>
            <input type="text" name="imageUrl" id="imageUrl" placeholder=" place image url..." .value="${flower.imageUrl}">
            <label for="height">Height:</label>
            <input type="number" name="height" id="height" placeholder=" height in cm..." .value="${flower.height}">
            <label for="small">Price for small size:</label>
            <input type="number" name="small" id="small" .value="${flower.price.small}">
            <label for="medium">Price for medium size:</label>
            <input type="number" name="medium" id="medium" .value="${flower.price.medium}">
            <label for="big">Price for big size:</label>
            <input type="number" name="big" id="big" .value="${flower.price.big}">
            
            <input type="submit" value="edit flower" id="edit-flower-btn">
        </form>
    </div>
</section>
`;

export async function editPage(context) {
    const flowerId = context.params.id;
    const flower = await getFlowerById(flowerId);
    const flowerLikes = flower.likes;

    context.render(editTemplate(flower, onSubmit));

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

        try {
            if (!name || !stems || !imageUrl || !height || !small || !medium || !big) {
                throw new Error('All fields are required!');
            } else if (!userId) {
                throw new Error('Not a registered user!');
            } else if (userId !== flower.creator) {
                throw new Error('Shoo! You didn\'t create this, you can\'t edit!');
            }

            await editFlower({ name, stems, imageUrl, height, small, medium, big,flowerLikes }, userId, flowerId);
            context.page.redirect('/profile');
        } catch(err) {
            notify(err.message);
        }
    }
}