/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

function Bird({ size, body, color }) {
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

Bird.propTypes = {
  size: PropTypes.array,
  body: PropTypes.object,
  color: PropTypes.string,
};

Bird.defaultProps = {
  size: [],
  body: {},
  color: [],
};

export default Bird;
