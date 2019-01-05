const LOGIN = '/login';
const REGISTER = '/register';
const RECIPES = '/recipes';
const RECIPES_WITH_ID = '/recipes/:id';
const FOODS = '/potraviny';
const PROFILE = '/profile';

const routes = { LOGIN, REGISTER, RECIPES, FOODS, RECIPES_WITH_ID, PROFILE };
export default routes;

const PERSONAL_INFORMATION = '/personal-information';
const FOOD_LIST = '/food-list';

export const profileRoutes = { PERSONAL_INFORMATION, FOOD_LIST, RECIPES };
