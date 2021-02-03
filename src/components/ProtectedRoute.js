import React, { useContext } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { LoginContext } from './_context/LoginContext';
import Login from './Login';

const ProtectedRoute = ({ path, component: Component }) => {
  const { isLogged } = useContext(LoginContext);

  return (
    <Route
      path={path}
      render={(props) =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        isLogged ? <Component {...props} /> : <Login />
      }
    />
  );
};

export default withRouter(ProtectedRoute);
