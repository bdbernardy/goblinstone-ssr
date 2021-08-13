import articlesRoutes from './articles-routes';
import loadable from '@loadable/component';

const mainRoutes = [
  {
    path: "/",
    loadableComponent: loadable(() => import(/* webpackChunkName: "home" */ 'Pages/home/Home')),
    exact: true
  },
  {
    path: "/about",
    loadableComponent: loadable(() => import(/* webpackChunkName: "about" */ 'Pages/about/About')),
    exact: true
  },
  {
    path: "/contact",
    loadableComponent: loadable(() => import(/* webpackChunkName: "contact" */ 'Pages/contact/Contact')),
    exact: true
  },
  ...articlesRoutes,
  {
    path: "/private",
    loadableComponent: loadable(() => import(/* webpackChunkName: "private" */ 'Pages/private/PrivateAreaRouter')),
    isSpa: true
  },
  {
    loadableComponent: loadable(() => import(/* webpackChunkName: "not-found" */ 'Shell/components/NotFound'))
  }
];

export default mainRoutes;
