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
              <a href="generic.html?&recipe_id=#${data.id}">
                <h2>${data.title}</h2>
        
              </a>
            </article>
        `;

    elements.tiles.insertAdjacentHTML("beforeend", html);
  }

  _renderIngredient(input) {
    const html = `
    <li class="ingredient">${input}</li>
    `;
    elements.ingredientsList.insertAdjacentHTML("beforeend", html);
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
    elements.statsTime.innerHTML = data.servings;
    elements.statsServings.innerHTML = data.cooking_time;

    // ingredient
    data.ingredients.forEach((ingredient) =>
      this._renderIngredient(ingredient)
    );
  }
}

export default View;
