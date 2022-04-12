import View from "../views/view.js";
import Model from "../model.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // tiles control
    this.start = 0;
    this.end = 12;

    this.init();
  }

  init = () => {
    // all recipes
    this.controlAllRecipesPage(this.model.recipesGroups, this.start, this.end);

    // view
    this.view.bindLoadMoreTiles(this.handleMoreTiles);
    this.view.bindLoadRecipeGroup(this.handleTileGroup);
    this.view.bindGroupRecipes(this.handleGrouping);
  };

  async controlAllRecipesPage(data, start, end) {
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
    if (input)
      this.view.allRecipeGroupRender(
        this.model.recipesGroups,
        this.start,
        this.end
      );
    else {
      this.view.renderMoreRecipes(
        this.model.recipes.recipes,
        this.start,
        this.end
      );
    }
  };

  handleTileGroup = async (input) => {
    await this.model.getRecipeGroup(input);
    this.view.allRecipes(this.model.recipes.recipes, this.start, this.end);
  };

  handleGrouping = () => {
    this.resetTilePositions();
    this.view.initAllGroupRender(
      this.model.recipesGroups,
      this.start,
      this.end
    );
  };
}

const app = new Controller(new Model(), new View());