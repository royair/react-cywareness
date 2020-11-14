import React from 'react';
import {observer} from 'mobx-react';
import {Switch, Route, Redirect, useLocation} from 'react-router-dom';

import {useStores} from './hooks/useStores';
import {
  LoginPage,
  HomePage,
  PrivateRoute,
  SpinCentered
} from './components/index';

const App = observer(() => {
  const {userStore} = useStores();
  const {pathname} = useLocation();

  return userStore.isReady
      ? (
          <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route exact path={'/login'}>
              <LoginPage />
            </Route>

            <PrivateRoute path="/home">
              <HomePage />
            </PrivateRoute>

            <Route exact path="/*">
              <Redirect to="/home" />
            </Route>
          </Switch>
      )
      : <SpinCentered />;
});

export default App;
