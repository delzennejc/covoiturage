import {
  DefaultPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'login',
      name: 'Login',
      component: DefaultPage,
      isIndex: true,
    },
  ],
};
