import * as elements from "./viewElements.js";
class View {
  constructor() {
    // new
    this.stateOfForm = false;
  }

  // NEW *********************************************

  _createFirstFormBlock() {
    return `
      <div class="submit-recipe_rest-of-required">
          <input class="submit-recipe__ingredient" type="text" required="" name="recipeUrl" placeholder="Recipe URL">
          <input class="submit-recipe__ingredient" type="text" required="" name="recipeImage" placeholder="Img URL">
          <input class="submit-recipe__ingredient" type="text" required="" name="recipePublisher" placeholder="Publisher">
          <input class="submit-recipe__ingredient" type="text" required="" name="recipeTime" placeholder="Preparation time">
          <input class="submit-recipe__ingredient submit-last-item" type="text" required="" name="recipeServings" placeholder="Servings">
      </div>
    `;
  }

  _createSecondFormBlock() {
    return `
      <div class="submit-recipes__ingredients">
        <p class="submit-recipe__paragraph">First ingredient is required</p>
        <input class="submit-recipe__ingredient" type="text" required="" name="ingredient-1" value="0.1,kg,Sugar" placeholder="Format: 'Quantity,Unit,Description'">
        <input class="submit-recipe__ingredient" type="text" name="ingredient-2"  placeholder="Format: 'Quantity,Unit,Description'">
        <input class="submit-recipe__ingredient" type="text" name="ingredient-3"  placeholder="Format: 'Quantity,Unit,Description'">
        <input class="submit-recipe__ingredient" type="text" name="ingredient-4"  placeholder="Format: 'Quantity,Unit,Description'">
        <input class="submit-recipe__ingredient" type="text" name="ingredient-5"  placeholder="Format: 'Quantity,Unit,Description'">
        <input class="submit-recipe__ingredient" type="text" name="ingredient-6"  placeholder="Format: 'Quantity,Unit,Description'">
        <input class="submit-recipe__ingredient" type="text" name="ingredient-7"  placeholder="Format: 'Quantity,Unit,Description'">
        <input class="submit-recipe__ingredient" type="text" name="ingredient-8"  placeholder="Format: 'Quantity,Unit,Description'">
      </div>
      <div class="submit-btn-box">
        <input type="submit" value="SUBMIT RECIPE" class="primary">
        <input type="reset" value="RESET VALUES">
      </div>
    `;
  }
  _renderBlock(html, element) {
    if (!html) return;
    this._insertHTML(element, html);
  }

  _insertHTML(element, html) {
    element.insertAdjacentHTML("beforeend", html);
  }

  bindFormSubmit = (handler) => {
    elements.submitForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // using FormData to pass trou evry input and get data
      const dataArray = [...new FormData(elements.submitForm)];
      // convert arr to obj
      const dataObject = Object.fromEntries(dataArray);
      handler(dataObject);
    });
  };

  // binded event listeners
  bindOpenFirstBlock = (handler) => {
    // state of form
    let blockIsOpend = false;
    // clear name on start
    elements.submitName.addEventListener("click", (event) => {
      if (!this.stateOfForm) {
        this.stateOfForm = true;
        const html = this._createFirstFormBlock();
        this._renderBlock(html, elements.submitForm);

        // for now two block will be add at a same time
        const html2 = this._createSecondFormBlock();
        this._renderBlock(html2, elements.submitForm);
      }
    });

    // TO DO
    // bindOpenSecondBlock = (handler) => {
    //   if (elements.submitLast)
    //     elements.submitLast.addEventListener("keydown", (event) => {
    //       if (event && elements.submitLast.value === "") {
    //         const html = this._createSecunFormBlock();
    //         this._renderBlock(html, elements.submitForm);
    //       }
    //     });
    // };
  };

  // Clear
  _clearTiles(elements) {
    while (elements.firstChild) elements.removeChild(elements.firstChild);
  }

  handleNewRecipe(input) {
    this._clearTiles(elements.submitSection);
    const msg = document.createElement("p");
    msg.innerHTML =
      "Recipe created successfully. You will be redirected to a new page in 5 seconds";
    msg.style.color = "green";
    elements.submitSection.appendChild(msg);

    setTimeout(() => {
      window.location = input;
    }, 5000);
  }
}

export default View;
