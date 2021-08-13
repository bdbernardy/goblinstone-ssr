import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node
};

const defaultProps = {
  isLoading: true,
  children: null
};

const Loading = ({isLoading, children}) => {
  return (isLoading ? <div>Loading... Please wait</div> : children);
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
