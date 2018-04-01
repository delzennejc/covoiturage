// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Form,
} from './';

export default {
  path: 'create-travel',
  name: 'Create travel',
  childRoutes: [
    { path: 'form', name: 'Form', component: Form, isIndex: true },
  ],
};
