import View from "../views/view.js";
import Model from "../model.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init = () => this.renderHomePage();

  async renderHomePage() {
    await this.model.getInitRecipes();
    this.view.initRender(this.model.recipes.recipes);
  }
}

const app = new Controller(new Model(), new View());
