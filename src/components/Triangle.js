/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import Images from './assets/Images';

function Bird({ body }) {
  const width = 100;
  const height = 100;
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
        backgroundColor: 'blue',
      }}
    >
      <Image style={{ width, height }} resizeMode="stretch" source={Images.triangle} />
    </View>
  );
}

Bird.propTypes = {
  body: PropTypes.object,
};

Bird.defaultProps = {
  body: {},
};

export default Bird;
