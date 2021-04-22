import {html} from 'https://unpkg.com/lit-html?module';
import { getFlowerById, deleteFlower } from "../api/data.js";

const detailsTemplate = (flowerId,hasLiked, flower, isCreator, onDelete, priceChoice, upLike) => html`
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
                            <option value="medium">medium (5 pcs)</option>
                            <option value="big">big (9pcs)</option>
                        </select>
                    </p>
                    <p><span>Price: </span>$${priceChoice(flower.price)}</p>
                </div>
                <div class="buttons">
                    <p>Likes: ${flower.likes} ${hasLiked ? '' : html`<i @click=${upLike} class="fas fa-heart"></i>`} </p>
                    ${isCreator ? html`
                    <div class="edit-del-btns">
                        <button class="edit"><a href="/edit/${flowerId}">edit</a></button>
                        <button @click=${onDelete} class="delete">delete</button>
                    </div>
                    ` : ''}
                    
                </div>
            </article>
        </section>
    </div>
</section>`;


export async function detailsPage(context) {
    const userId = sessionStorage.getItem('userId');
    const flowerId = context.params.id;
    const hasLiked = false;

    const flower = await getFlowerById(flowerId);
    if (userId in flower.likes) {
        hasLiked = true;
    }
    const isCreator = userId === flower.creator;

    context.render(detailsTemplate(flowerId,hasLiked, flower, isCreator, onDelete, priceChoice, upLike));

    function priceChoice(price) {
        const choice = document.getElementById('size-choice').value;
        if (choice == 'small') {
            return price.small;
        } else if ( choice == 'medium') {
            return price.medium;
        } else {
            return price.big;
        }
    }
    async function onDelete() {
        const confirmation = confirm('Are you sure you want to delete this flower?');
        if (confirmation) {
            await deleteFlower();
            context.page.redirect('/catalog');
        }
    }
    async function upLike() {
        console.log('one like')
    }
}