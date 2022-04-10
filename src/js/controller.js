import View from "./views/view.js";
import Model from "./model.js";
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.id;
    this.init();
  }

  init() {
    //HOME PAGE
    this.handleHomePage();
    // specific recipe
    this.handleSpecificRecipe();
  }

  getID() {
    const id = window.location.hash.slice(1);
    if (id) return id;
  }

  async handleHomePage() {
    if (this.getID()) return;
    await this.model.fetchRecipes("pizza");
    this.view.renderRecipes(this.model.recipes.recipes);
  }

  async handleSpecificRecipe() {
    // specific recipe

    if (!this.getID()) return;
    await this.model.fetchRecipes(this.getID(), false);
    this.view.renderSpecificRecipe(this.model.recipes.recipe);
  }
}

const app = new Controller(new Model(), new View());
