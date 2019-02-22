import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '_constants/routesConstants';
import PrivateRoute from '_utils/PrivateRoute';

const Recipes = lazy(() => import(/* webpackChunkName: "Recipes" */ 'recipes/RecipesPage'));
const RecipeDetail = lazy(() =>
  import(/* webpackChunkName: "RecipeDetail" */ 'recipes/RecipeDetail')
);
const Foods = lazy(() => import(/* webpackChunkName: "Foods" */ 'foods/FoodsPage'));
const Profile = lazy(() => import(/* webpackChunkName: "Profile" */ 'profile/ProfilePage'));
const AddEditRecipe = lazy(() =>
  import(/* webpackChunkName: "AddEditRecipe" */ 'profile/components/recipes/AddEditRecipe')
);

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact={true} path="/" component={Recipes} />
          <PrivateRoute path={routes.PROFILE} component={Profile} />
          <Route exact={true} path={routes.FOODS} component={Foods} />
          <Route exact={true} path={routes.RECIPES} component={Recipes} />
          <PrivateRoute
            exact={true}
            path={routes.ADD_RECIPE}
            component={() => <AddEditRecipe isNew={true} />}
          />
          <Route exact={true} path={routes.RECIPE_DETAILS} component={RecipeDetail} />
          <PrivateRoute
            exact={true}
            path={routes.EDIT_RECIPE_WITH_ID}
            component={() => <AddEditRecipe isNew={false} />}
          />
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
