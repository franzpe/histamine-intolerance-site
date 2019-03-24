import React, { Component, lazy, Fragment } from 'react';
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
const Policy = lazy(() => import(/* webpackChunkName: "Policy" */ 'policy/Policy'));
const AboutUs = lazy(() => import(/* webpackChunkName: "AboutUs" */ 'aboutUs/AboutUsPage'));
const Admin = lazy(() => import(/* webpackChunkName: "AboutUs" */ 'admin/AdminPage'));

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact={true} path="/" component={Recipes} />
          <PrivateRoute path={routes.PROFILE} component={Profile} />
          <Route exact={true} path={routes.FOODS} component={Foods} />
          <Route exact={true} path={routes.RECIPES} component={Recipes} />
          <Route exact={true} path={routes.ABOUT_US} component={AboutUs} />
          <Route exact={true} path={routes.POLICY} component={Policy} />
          <PrivateRoute path={routes.ADMIN} component={Admin} admin={true} />
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
      </Fragment>
    );
  }
}

export default Routes;
