import {matchRoutes} from 'react-router-config';

import mainRoutes from 'Shell/routing/main-routes';

const getRouteData = async (path, search) => {
  let routeData = {
    initialState: {}
  };

  const matches = matchRoutes(mainRoutes, path);

  if (matches.length > 0) {
    const route = matches[0].route;

    if (route.isSpa) {
      return {isSpa: true};
    }

    const module = await route.loadableComponent?.load();
    const component = module.default;

    if (component?.getInitialState) {
      const queryParameters = new URLSearchParams(search);
      const routeParameters = matches[0].match.params;

      routeData.initialState = await component.getInitialState(routeParameters, queryParameters);
    }

    if (component.status) {
      routeData.status = component.status;
    }
  }

  return routeData;
};

export {getRouteData};
