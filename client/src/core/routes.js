import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../_constants/routesConstants';

const Recipes = lazy(() => import(/* webpackChunkName: "Recipes" */ '../recipes/RecipesPage'));

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact={true} path="/" component={Recipes} />
          <Route exact={true} path={routes.RECIPES} component={Recipes} />
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
