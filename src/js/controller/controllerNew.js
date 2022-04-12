import View from "../views/viewNew.js";
import Model from "../model/model.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init = () => {
    this.view.bindOpenFirstBlock(this.handleFirstBlock);
    // this.view.bindOpenSecondBlock(this.handleSecondBlock);
    this.view.bindFormSubmit(this.handleSubmit);
  };

  handleFirstBlock = (input) => {};
  // handleSecondBlock = (input) => {};

  // Upload
  handleSubmit = (input) => {
    this.model.uploadNewRecipe(input);
  }
}

const app = new Controller(new Model(), new View());
