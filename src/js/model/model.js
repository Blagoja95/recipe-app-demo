import search from "./searchWords.js";
import shortSearch from "./searchWordsShort.js";
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
      console.log("feched");
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
    // return random arr of recipes
    // arr is have 12 recipes or more
    const randIndexOfSearchArr = Math.trunc(Math.random() * shortSearch.length);
    this.recipes = await this._fetchRecipes(shortSearch[randIndexOfSearchArr]);
  }

  async getSpecificRecipe(id, state = false) {
    this.specificRecipe = await this._fetchRecipes(id, state);
  }

  // NEW RECIPE

  uploadNewRecipe = async (input) => {
    try {
      const ingredients = Object.entries(input)
        .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
        .map((ing) => {
          const ingArr = ing[1].split(",").map((el) => el.trim());
          // const ingArr = ing[1].replaceAll(' ', '').split(',');
          if (ingArr.length !== 3)
            throw new Error(
              "Wrong ingredient fromat! Please use the correct format"
            );
          const [quantity, unit, description] = ingArr;
          return { quantity: quantity ? +quantity : null, unit, description };
        });

      console.log("Input", input);

      let recipe = {
        title: input.recipeName,
        source_url: input.recipeUrl,
        image_url: input.recipeImage,
        publisher: input.recipePublisher,
        cooking_time: +input.recipeTime,
        servings: +input.recipeServings,
        ingredients,
      };

      console.log(recipe);
    } catch (error) {
      console.error(error);
    }
  };
  // get keywords to select all keyword who return recipes arr
  // larger then 12
  // used to make serchWordsShort.js
  // async getKeywords() {
  //   // console.log(search);
  //   // const res = await this._fetchRecipes(search[0]);
  //   // console.log(res.recipes);
  //   const words = [];
  //   for (let i = 0; i < 50; i++) {
  //     const res = await this._fetchRecipes(search[i]);
  //     if (res.recipes.length > 12) {
  //       words.push(search[i]);
  //     }
  //   }
  //   console.log(words);
  // }
}

export default Model;
