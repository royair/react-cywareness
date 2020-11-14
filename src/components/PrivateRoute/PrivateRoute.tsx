import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useStores} from '../../hooks/useStores';
import {observer} from 'mobx-react';

const PrivateRoute = observer(({children, ...rest}: any) => {
  const {userStore} = useStores();
  console.log('PrivateRoute!');

  return (
      <Route
          {...rest}
          render={({location}) =>
              userStore.isAuthenticated ? (
                  children
              ) : (
                  <Redirect
                      to={{
                        pathname: '/login',
                        state: {from: location}
                      }}
                  />
              )
          }
      />
  );
});

export default PrivateRoute;
