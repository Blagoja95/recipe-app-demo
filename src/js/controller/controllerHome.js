import View from "../views/viewHome.js";
import Model from "../model/model.js";

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
