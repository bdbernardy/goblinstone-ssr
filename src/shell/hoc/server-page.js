import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {useParams, useLocation} from 'react-router-dom';
import Loading from 'Shell/components/Loading';

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);

  /*
    let queryParameters = {};
    for (var value of searchParams.keys()) {
      const keyValues = searchParams.getAll(value);
      queryParameters[value] = keyValues.length === 1 ? keyValues[0] : keyValues;
    }
  */
};

const serverPage = (Component) => {
  const propTypes = {
    initialState: PropTypes.object
  };

  const serverComponent = ({initialState}) => {
    const [state, setState] = useState({
      loading: !initialState && Component.getInitialState !== undefined,
      initialState
    });
    const routeParameters = useParams();
    const queryParameters = useQueryParams();

    useEffect(() => {
      if (state.loading) {
        Component.getInitialState(routeParameters, queryParameters).then((initialState) => {
          setState({
            loading: false,
            initialState
          });
        });
      }
    }, [setState]);

    return (state.loading ? <Loading /> : <Component {...state.initialState}/>);
  };

  serverComponent.propTypes = propTypes;
  serverComponent.getInitialState = Component.getInitialState;

  return serverComponent;
};

export {serverPage};
