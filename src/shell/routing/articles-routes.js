import loadable from '@loadable/component';

const articlesRoutes = [
  {
    path: "/blog",
    loadableComponent: loadable(() => import(/* webpackChunkName: "articles" */ 'Pages/articles/Articles')),
    exact: true
  },
  {
    path: "/articles/:id",
    loadableComponent: loadable(() => import(/* webpackChunkName: "article" */ 'Pages/articles/Article')),
    exact: true
  }
];

export default articlesRoutes;
