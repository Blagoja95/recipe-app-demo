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

  _insertHTML(element, html, position = "beforeend") {
    element.insertAdjacentHTML(position, html);
  }

  // Clear
  _clearTiles(elements) {
    while (elements.firstChild) elements.removeChild(elements.firstChild);
  }

  _render(data, start, end, element, recipeGroups = false, moreRecipe = false) {
    if (element == null) return;

    if (!recipeGroups) {
      if (!moreRecipe) this._clearTiles(element);
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
}

export default View;
