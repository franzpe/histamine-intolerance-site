const LOGIN = '/login';
const REGISTER = '/register';
const RECIPES = '/recipes';
const RECIPE_DETAILS = '/recipes/:id';
const FOODS = '/potraviny';
const PROFILE = '/profile';
const ADD_RECIPE = '/recipes/add';
const EDIT_RECIPE = '/recipes/edit/:id';

const routes = {
  LOGIN,
  REGISTER,
  RECIPES,
  FOODS,
  RECIPE_DETAILS,
  PROFILE,
  ADD_RECIPE,
  EDIT_RECIPE
};
export default routes;

const PERSONAL_INFORMATION = '/personal-information';
const FOOD_LIST = '/food-list';

export const profileRoutes = { PERSONAL_INFORMATION, FOOD_LIST, RECIPES };
