const LOGIN = '/prihlasenie';
const REGISTER = '/registracia';
const RECIPES = '/recepty';
const RECIPE_DETAILS = '/recepty/:id';
const FOODS = '/potraviny';
const PROFILE = '/profil';
const ADD_RECIPE = '/recepty/pridanie';
const EDIT_RECIPE = '/recepty/editacia';
const EDIT_RECIPE_WITH_ID = '/recepty/editacia/:id';
const ABOUT_US = '/o-nas';
const ADMIN = '/admin';

const routes = {
  LOGIN,
  REGISTER,
  RECIPES,
  FOODS,
  RECIPE_DETAILS,
  PROFILE,
  ADD_RECIPE,
  EDIT_RECIPE,
  EDIT_RECIPE_WITH_ID,
  ABOUT_US,
  ADMIN
};

export default routes;

const PERSONAL_INFORMATION = '/osobne-udaje';
const FOOD_LIST = '/moj-zoznam-potravin';

export const profileRoutes = { PERSONAL_INFORMATION, FOOD_LIST, RECIPES };
