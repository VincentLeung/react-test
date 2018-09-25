import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
export const RouteMap = ({routes}) => (
    <Switch>
      {routes.map(d => (
          d.privateRoute
          ? <PrivateRoute exact={d.exact} key={d.to} path={d.to} component={d.comp} />
          : <Route exact={d.exact} key={d.to} path={d.to} component={d.comp} />
        ))}
    </Switch>
)