/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './common/history';

function loggedIn() {
  const token = localStorage.getItem('token'); // eslint-disable-line
  return (token && token !== '');
}

const PrivateRoute = ({ component: Component, ...rest }) => (// eslint-disable-line
  <Route
    {...rest}
    render={props => (loggedIn() === true) ? <Component {...props} /> : <Redirect to='/login' /> }  // eslint-disable-line
  />
);

function renderRouteConfigV3(Container, routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      children.push(renderRouteConfigV3(item.component, item.childRoutes, newContextPath));
    } else if (item.component) {
      if (newContextPath === '/login') {
        children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />);
      } else {
        children.push(<PrivateRoute key={newContextPath} component={item.component} path={newContextPath} exact />);
      }
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));

  // Use Switch as the default container by default
  if (!Container) return <Switch>{children}</Switch>;

  return (
    <Container key={contextPath}>
      <Switch>
        {children}
      </Switch>
    </Container>
  );
}

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };
  render() {
    const children = renderRouteConfigV3(null, this.props.routeConfig, '/');
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </Provider>
    );
  }
}
