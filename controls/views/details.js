import {html} from '../../node_modules/lit-html/lit-html.js';
import { getFlowerById, deleteFlower, likeFlower } from "../api/data.js";

const detailsTemplate = (flowerId, flower, isCreator,hasLiked, onDelete,onLike) => html`
<section class="details-page">
    <div class="wrapper">
        <section class="details-card">
            <img src="${flower.imageUrl}" alt="${flower.name}">
            <article class="card-contents">
                <div class="text">
                    <h2>${flower.name}</h2>
                    <p><span>Stems: </span>${flower.stems}</p>
                    <p><span>Height: </span>${flower.height} cm</p>
                    <p><span>Size: </span>
                        <select name="size" id="size-choice">
                            <option value="small">small (3pcs)</option>
                            <option selected="selected" value="medium">medium (5 pcs)</option>
                            <option value="big">big (9pcs)</option>
                        </select>
                    </p>
                    <p id="price"><span>Price: </span>$${flower.price.medium}</p>
                    <p>${flower.likes 
                        ? Object.values(flower.likes).length : 0} Likes ${hasLiked ? '' 
                        : html`<i @click=${onLike} class="fas fa-heart"></i>`} </p>
                </div>
                <div class="buttons">
                    ${isCreator 
                        ? html`
                    <div class="edit-del-btns">
                        <button class="edit"><a href="/edit/${flowerId}">edit</a></button>
                        <button @click=${onDelete} class="delete">delete</button>
                    </div>` 
                        : ''}
                    
                </div>
            </article>
        </section>
    </div>
</section>`;


export async function detailsPage(context) {
    const userId = sessionStorage.getItem('userId');
    const userEmail = sessionStorage.getItem('userEmail');
    const flowerId = context.params.id;

    const flower = await getFlowerById(flowerId);
    const isCreator = userId === flower.creator;

    const hasLiked = flower.likes ? Object.values(flower.likes).some(like => like.creator == userEmail) : false;

    context.render(detailsTemplate(flowerId, flower, isCreator,hasLiked, onDelete,onLike));
    document.getElementById('size-choice').addEventListener('change', ev => {
        const priceTag = document.getElementById('price');
        const element = ev.target;
        const choice = element.options[element.selectedIndex].text.split(' ')[0];
        priceTag.innerHTML = `<span>Price: </span>$${flower.price[choice]}`;
    })
    
    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this flower?');
        if (confirmation) {
            await deleteFlower(flowerId);
            context.page.redirect('/catalog');
        }
    }
    async function onLike(e) {
        await likeFlower(flowerId, userEmail);
        e.target.style.display = 'none';
        detailsPage(context);
    }

}