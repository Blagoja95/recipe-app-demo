import View from "../views/viewSpecific.js";
import Model from "../model.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.id;
    this.init();
  }

  // specific recipe
  init = () => this.controlSpecificRecipePage();

  getID() {
    const id = window.location.hash.slice(1);
    if (id) return id;
  }

  async controlSpecificRecipePage() {
    if (!this.getID()) return;
    await this.model.getSpecificRecipe(this.getID());
    this.view.renderSpecificRecipe(this.model.specificRecipe.recipe);
  }
}

const app = new Controller(new Model(), new View());
