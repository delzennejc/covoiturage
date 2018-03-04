// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  DefaultPage,
} from './';

export default {
  path: 'create-account',
  name: 'Create account',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
  ],
};
