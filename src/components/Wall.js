/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

function Wall({ size, body, color }) {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color,
      }}
    />
  );
}
Wall.propTypes = {
  size: PropTypes.array,
  body: PropTypes.object,
  color: PropTypes.string,
};

Wall.defaultProps = {
  size: [],
  body: {},
  color: [],
};

export default Wall;
