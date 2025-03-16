import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthorised } from '../services/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthorised() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/admin/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute; 