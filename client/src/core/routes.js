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

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact={true} path="/" component={Recipes} />
          <Route exact={true} path={routes.RECIPES} component={Recipes} />
          <Route exact={true} path={routes.RECIPES_WITH_ID} component={RecipeDetail} />
          <PrivateRoute path={routes.PROFILE} component={Profile} />
          <Route exact={true} path={routes.FOODS} component={Foods} />
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
