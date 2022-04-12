import * as elements from "./viewElements.js";
class View {
  constructor() {}

  _renderIngredient(input) {
    const html = `
    <li class="ingredient">${input}</li>
    `;
    this._insertHTML(elements.ingredientsList, html);
  }

  _renderIngredient(input) {
    const html = `
    <li class="ingredient">
                <ion-icon name="basket"></ion-icon>
                ${
                  input.quantity === null
                    ? ""
                    : `<span class="quantity">${input.quantity}</span>`
                }

                <span class="unit"> ${input.unit}</span>
                <span class="description">${input.description}</span>
              </li>
    `;

    this._insertHTML(elements.ingredientsList, html);
  }

  _renderFacebookShareBtn(input) {
    const html = `
    <iframe src="https://www.facebook.com/plugins/share_button.php?href=${input}&layout=button&size=large&width=78&height=28&appId" width="78" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
    `;
    this._insertHTML(elements.facebookShare, html);
  }

  _insertHTML(element, html, position = "beforeend") {
    element.insertAdjacentHTML(position, html);
  }

  renderSpecificRecipe(data) {
    if (elements.mainTitle == null) return;

    //change webpage title, main title, banner image
    elements.pageTitle.textContent = data.title;
    elements.mainTitle.innerHTML = data.title;
    elements.mainImage.src = data.image_url;

    //recipe stats
    elements.statsServings.innerHTML = data.servings;
    elements.statsTime.innerHTML = data.cooking_time;

    // ingredient
    data.ingredients.forEach((ingredient) =>
      this._renderIngredient(ingredient)
    );

    // how to cook it
    elements.preparationName.innerHTML = data.publisher;
    elements.preparationLink.href = data.source_url;

    // share btn for fb
    const pageUrl = document.URL;
    this._renderFacebookShareBtn(pageUrl);
  }
}

export default View;
