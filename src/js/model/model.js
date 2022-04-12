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
    this.API_KEY = "2b41f261-48bb-4ba6-96ef-fc9d78ebecc4";
    this.TIMEOUT_SEC = 10;
    this.newRecipeURL = null;
  }

  bindCallControler(callback) {
    this.handleCallFromModel = callback;
  }

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

      const recipe = {
        title: input.recipeName,
        source_url: input.recipeUrl,
        image_url: input.recipeImage,
        publisher: input.recipePublisher,
        cooking_time: +input.recipeTime,
        servings: +input.recipeServings,
        ingredients,
      };

      // console.log(`${this.SPECIFIC_RECIPE_URL}?key=${this.API_KEY}`);
      this._fetchTO(`${this.SPECIFIC_RECIPE_URL}?key=${this.API_KEY}`, recipe);
    } catch (error) {
      console.error(error);
    }
  };

  _getUrl = () => {
    const fullUrl = window.location;
    const url = fullUrl.href.split("newRecipe");
    if (url[0] != "") return url[0];
  };

  _fetchTO = async (url, data) => {
    const input = data;
    try {
      const fetchPOST = input
        ? fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          })
        : fetch(url);

      const res = await Promise.race([
        fetchPOST,
        this._timeout(this.TIMEOUT_SEC),
      ]);
      const data = await res.json();

      // get url of newly created recipe
      this.specificRecipe = data;
      this.newRecipeURL = `${this._getUrl()}recipe.html?&recipe_id=#${
        this.specificRecipe.data.recipe.id
      }`;

      // notify controller about new recipe
      this.handleCallFromModel(this.newRecipeURL);
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    } catch (error) {
      console.log(error);
    }
  };

  _timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
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
