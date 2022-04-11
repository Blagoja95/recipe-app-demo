import * as elements from "./viewElements.js";
const MAXRECIPE = 12;

class View {
  constructor() {}

  _renderTile(data) {
    const html = `
        <article class="style1">
              <span class="image">
                <img src="${data.image_url}" alt="${data.title}" class="img"/>
              </span>
              <a href="recipe.html?&recipe_id=#${data.id}">
                <h2>${data.title}</h2>
        
              </a>
            </article>
        `;

    this._insertHTML(elements.tiles, html);
  }

  _renderIngredient(input) {
    const html = `
    <li class="ingredient">${input}</li>
    `;
    this._insertHTML(elements.ingredientsList, html);
  }

  _renderIngredient(input) {
    const html = `
    <li class="ingredient">
                <ion-icon name="basket"></ion-icon>
                ${
                  input.quantity === null
                    ? ""
                    : `<span class="quantity">${input.quantity}</span>`
                }

                <span class="unit"> ${input.unit}</span>
                <span class="description">${input.description}</span>
              </li>
    `;

    this._insertHTML(elements.ingredientsList, html);
  }

  _insertHTML(element, html) {
    element.insertAdjacentHTML("beforeend", html);
  }

  renderRecipes(data, init = true) {
    console.log(data);
    // Clear
    if (elements.tiles == null) return;

    while (elements.tiles.firstChild)
      elements.tiles.removeChild(elements.tiles.firstChild);

    if (init) for (let i = 0; i < MAXRECIPE; i++) this._renderTile(data[i]);
  }

  renderSpecificRecipe(data) {
    console.log(data);
    if (elements.mainTitle == null) return;

    //change title, banner image
    elements.mainTitle.innerHTML = data.title;
    elements.mainImage.src = data.image_url;

    //recipe stats
    elements.statsServings.innerHTML = data.servings;
    elements.statsTime.innerHTML = data.cooking_time;

    // ingredient
    data.ingredients.forEach((ingredient) =>
      this._renderIngredient(ingredient)
    );
  }
}

export default View;
