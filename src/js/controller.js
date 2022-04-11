import View from "./views/view.js";
import Model from "./model.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.id;

    // tiles control
    this.start = 0;
    this.end = 12;

    this.init();
  }

  init() {
    //HOME PAGE
    this.renderHomePage();
    // specific recipe
    this.controlSpecificRecipePage();
    // all recipes
    this.controlAllRecipesPage(this.start, this.end);

    // view
    this.view.bindLoadMoreTiles(this.handleMoreTiles);
  }

  getID() {
    const id = window.location.hash.slice(1);
    if (id) return id;
  }

  async renderHomePage() {
    // if (this.getID()) return;
    // await this.model.getInitRecipes();
    // this.view.initRender(this.model.recipes.recipes);
  }

  async controlSpecificRecipePage() {
    if (!this.getID()) return;
    // await this.model.getSpecificRecipe(this.getID());
    // this.view.renderSpecificRecipe(this.model.specificRecipe.recipe);
  }

  async controlAllRecipesPage(start, end) {
    // if (this.getID()) return;
    this.view.allRecipeListsRender(this.model.recipesGroups, start, end);
  }

  // BINDED HANDLERS
  handleMoreTiles = (input) => {
    this.start += 12;
    this.end += 12;
    this.view.allRecipeListsRender(
      this.model.recipesGroups,
      this.start,
      this.end
    );
  };
}

const app = new Controller(new Model(), new View());
