import search from "./searchWords.js";

class Model {
  constructor() {
    this.recipes;
    this.specificRecipe;
    this.recipesGroups = search;
    this.RECIPE_URL =
      "https://forkify-api.herokuapp.com/api/v2/recipes?search=";
    this.SPECIFIC_RECIPE_URL =
      "https://forkify-api.herokuapp.com/api/v2/recipes/";
    this.API_KEY = "f35bec5d-de69-441b-a10c-b4f4a72c267c";
  }
  cl;

  _fetchRecipes = async (input, all = true) => {
    try {
      const promise = await fetch(
        `${all ? this.RECIPE_URL : this.SPECIFIC_RECIPE_URL}${input}`
      );
      if (!promise.ok) throw new Error(`${promise.status}`);
      const data = await promise.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  async getAllRecipes(input) {
    this.recipes = await this._fetchRecipes(input);
  }

  async getInitRecipes() {
    try {
      const randIndexOfSearchArr = Math.trunc(Math.random() * search.length);
      // some queris return recipes list with less then 12 items
      do {
        this.recipes = await this._fetchRecipes(search[randIndexOfSearchArr]);
      } while (this.recipes.recipes.length < 12);
    } catch (error) {
      console.error(error);
    }
  }

  async getSpecificRecipe(id, state = false) {
    this.specificRecipe = await this._fetchRecipes(id, state);
  }
}

export default Model;
