import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import MainPage from './components/MainPage/MainPage';
import Search from './components/Search/Search';
import Favorite  from './components/Favorite/Favorite';
import ProductPage  from './components/ProductPage/ProductPage';

const app = props => {
  // const { onTryAutoSignup } = props;

  // useEffect (() => {
  //   onTryAutoSignup();
  // },[onTryAutoSignup]);
  
    let routes = (
        <Switch>
          <Route path="/search" exact render={props => <Search {...props} />} />
          <Route path="/favorite" exact render={props => <Favorite {...props} />} />
          <Route path="/product/:id" exact render={props => <ProductPage {...props} />} />
          <Route path="/category/:id" exact render={props => <Search {...props} />} />
          <Route path="/brand/:id" exact render={props => <Search {...props} />} />
          <Route path="/" exact component={props => <MainPage {...props} />} />
          <Redirect to="/" />
        </Switch>
    );

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
} 

export default withRouter(app);
