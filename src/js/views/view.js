import * as elements from "./viewElements.js";
class View {
  constructor() {
    this.INIT_MAX_RECIPES = 12;
    this.DEFAULT_START = 0;
  }

  _renderTile(data, element) {
    if (!data) return;
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

    this._insertHTML(element, html);
  }

  _renderRecipesListTile(title, element) {
    if (!title) return;
    const html = `
    <article class="style1">
      <span class="image">
       <img src="src/images/pic01.jpg" alt="" />
       </span>
       <a href="#tiles">
        <h2>${title}</h2>
      </a>
    </article> `;

    this._insertHTML(element, html);
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

  _renderFacebookShareBtn(input) {
    const html = `
    <iframe src="https://www.facebook.com/plugins/share_button.php?href=${input}&layout=button&size=large&width=78&height=28&appId" width="78" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
    `;
    this._insertHTML(elements.facebookShare, html);
  }

  _insertHTML(element, html) {
    element.insertAdjacentHTML("beforeend", html);
  }

  // Clear
  _clearTiles(element) {
    while (elements.firstChild) elements.removeChild(elements.firstChild);
  }

  _render(data, start, end, element, recipeGroup = false) {
    if (element == null) return;

    if (!recipeGroup) {
      this._clearTiles(element);
      for (start; start < end; start++) this._renderTile(data[start], element);
    } else
      for (start; start < end; start++)
        this._renderRecipesListTile(data[start], element);
  }

  initRender = (data) => {
    this._render(
      data,
      this.DEFAULT_START,
      this.INIT_MAX_RECIPES,
      elements.tiles
    );
  };

  allRecipeListsRender = (data, start, end) => {
    console.log(data);
    this._render(data, start, end, elements.tiles, true);
  };

  renderSpecificRecipe(data) {
    if (elements.mainTitle == null) return;

    //change webpage title, main title, banner image
    elements.pageTitle.textContent = data.title;
    elements.mainTitle.innerHTML = data.title;
    elements.mainImage.src = data.image_url;

    //recipe stats
    elements.statsServings.innerHTML = data.servings;
    elements.statsTime.innerHTML = data.cooking_time;

    // ingredient
    data.ingredients.forEach((ingredient) =>
      this._renderIngredient(ingredient)
    );

    // how to cook it
    elements.preparationName.innerHTML = data.publisher;
    elements.preparationLink.href = data.source_url;

    // share btn for fb
    const pageUrl = document.URL;
    this._renderFacebookShareBtn(pageUrl);
  }

  // event listeners
  bindLoadMoreTiles = (handler) => {
    elements.LoadMoreBTN.addEventListener("click", (event) => {
      event.preventDefault();
      handler("hi");
    });
  };
}

export default View;
