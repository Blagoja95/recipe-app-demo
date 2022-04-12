import View from "../views/viewNew";
import Model from "../model/model.js";

class Controller {
  // constructor(model, view) {
    this.model = model;
    this.view = view;
    this.id;

    // tiles control
    this.start = 0;
    this.end = 12;

    this.init();
  }

  init = () => {
    //HOME PAGE
    this.renderHomePage();
    // specific recipe
    this.controlSpecificRecipePage();
    // all recipes
    this.controlAllRecipesPage(this.model.recipesGroups, this.start, this.end);

    // view
    this.view.bindLoadMoreTiles(this.handleMoreTiles);
    this.view.bindLoadRecipeGroup(this.handleTileGroup);
    this.view.bindGroupRecipes(this.handleGrouping);
  };

  getID() {
    const id = window.location.hash.slice(1);
    if (id) return id;
  }

  checkPage(input) {
    const url = window.location.href;
    if (url.includes(input)) return true;
  }

  async renderHomePage() {
    if (!this.checkPage("index")) return;
    await this.model.getInitRecipes();
    this.view.initRender(this.model.recipes.recipes);
    console.log("home triggerd");
  }

  async controlSpecificRecipePage() {
    if (!this.getID()) return;
    await this.model.getSpecificRecipe(this.getID());
    this.view.renderSpecificRecipe(this.model.specificRecipe.recipe);
    console.log("specific triggerd");
  }

  async controlAllRecipesPage(data, start, end) {
    if (!this.checkPage("allRecipes")) return;
    this.view.allRecipeGroupRender(data, start, end);
    console.log("all triggerd");
  }

  resetTilePositions() {
    this.start = 0;
    this.end = 12;
  }

  // BINDED HANDLERS
  handleMoreTiles = (input) => {
    this.start += 12;
    this.end += 12;
    this.view.allRecipeGroupRender(
      this.model.recipesGroups,
      this.start,
      this.end
    );
  };

  handleTileGroup = async (input) => {
    await this.model.getRecipeGroup(input);
    this.view.allRecipes(this.model.recipes, this.start, this.end);
  };

  handleGrouping = () => {
    this.resetTilePositions();
    this.view.allRecipeGroupRender(
      this.model.recipesGroups,
      this.start,
      this.end
    );
  };
}

const app = new Controller(new Model(), new View());
