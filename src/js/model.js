class Model {
  constructor() {
    this.recipes;
    this.RECIPE_URL =
      "https://forkify-api.herokuapp.com/api/v2/recipes?search=";
    this.SPECIFIC_RECIPE_URL =
      "https://forkify-api.herokuapp.com/api/v2/recipes/";
    this.API_KEY = "f35bec5d-de69-441b-a10c-b4f4a72c267c";
  }

  fetchRecipes = async (input, specific = true) => {
    try {
      const promise = await fetch(
        `${specific ? this.RECIPE_URL : this.SPECIFIC_RECIPE_URL}${input}`
      );
      if (!promise.ok) throw new Error(`${promise.status}`);
      const data = await promise.json();
      this.recipes = data.data;
      console.log("MODEL", data.data);
    } catch (error) {
      console.error(error);
    }
  };
}

export default Model;
