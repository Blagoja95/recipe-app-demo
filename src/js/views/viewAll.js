import * as elements from "./viewElements.js";
class View {
  constructor() {
    this.INIT_MAX_RECIPES = 12; // 12 tiles per render
    this.DEFAULT_START = 0;
    this.RECIPE_GROUP_CLASS = "btn--recipe-group";
    this.loadMoreGroupsState = true; // state for load btn

    // form msg
    this.FORM_EMPTY_MSG = "Search bar can't be empty";
    this.FORM_NO_RECIPES_MSG = "Search result found 0 recipes";
  }

  // recipe tile
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

  // recipe group tile
  _renderRecipesListTile(title, element) {
    if (!title) return;
    const html = `
    <article class="style1">
      <span class="image">
       <img src="" alt="" class="recipe-group__img"/>
       </span>
       <a href="#tile" class="btn--recipe-group ${title}">
        <h2>${title}</h2>
      </a>
    </article> `;

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

  initAllGroupRender = (data, start, end) => {
    // reset filter and render inital 12 recipe groups tiles
    this._clearTiles(elements.tilesAll);
    this._render(data, start, end, elements.tilesAll, true);
  };

  allRecipeGroupRender = (data, start, end) => {
    this._render(data, start, end, elements.tilesAll, true);
  };

  allRecipes = (data, start, end) => {
    // render recipes
    this._render(data, start, end, elements.tilesAll);
  };

  renderMoreRecipes = (data, start, end) => {
    // load more recipes btn
    this._render(data, start, end, elements.tilesAll, false, true);
  };

  customRender(data, start, end) {
    // for form search
    // if an input data length is 0,
    // there were no recipes
    if (data.length === 0) this._formError(this.FORM_NO_RECIPES_MSG);
    this.allRecipes(data, start, end);
  }

  _formError(msg = "error") {
    elements.formInput.value = msg;
    elements.formInput.style.color = "red";
    setTimeout(() => {
      elements.formInput.style.color = "#585858";
      elements.formInput.value = "";
    }, 5000); // after 5s clear error msg
  }

  // event listeners
  bindLoadMoreTiles = (handler) => {
    if (!elements.LoadMoreBTN) return;
    elements.LoadMoreBTN.addEventListener("click", (event) => {
      event.preventDefault();
      // depending on a state of the load btn
      // tiles  will be renderd
      //as a recepi groups or  a recipes
      handler(this.loadMoreGroupsState);
    });
  };

  bindLoadRecipeGroup = (handler) => {
    if (!elements.tilesAll) return;
    elements.tilesAll.addEventListener("click", (event) => {
      const name = event.target.className.split(" ");
      if (name.length < 2 || name === "" || name[0] != "btn--recipe-group")
        return;
      else {
        // switch btn role and get name of recipe group
        this.loadMoreGroupsState = false;
        if (name.length < 3) handler(name[1]);
        else handler(`${name[1]} ${name[2]}`);
      }
    });
  };

  bindGroupRecipes = (handler) => {
    if (!elements.GroupRecipesBTN) return;
    elements.GroupRecipesBTN.addEventListener("click", () => {
      // reset btn load
      this.loadMoreGroupsState = true;
      handler();
    });
  };

  bindFormSearch = (handler) => {
    elements.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = elements.formInput.value;
      if (data === "") {
        this._formError(this.FORM_EMPTY_MSG);
      } else {
        // tho change load btn mode to loading recipes
        this.loadMoreGroupsState = false;
        handler(data);
      }
    });
  };
}

export default View;
