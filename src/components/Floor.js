/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable prefer-spread */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, Image } from 'react-native';
import Images from './assets/Images';

class Floor extends PureComponent {
  render() {
    const { body } = this.props;
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    const imageIterations = Math.ceil(width / height);

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
          overflow: 'hidden',
          flexDirection: 'row',
        }}
      >
        {Array.apply(null, Array(imageIterations)).map((el, idx) => {
          return (
            <Image
              style={{ width: height, height }}
              key={idx}
              source={Images.floor}
              resizeMode="stretch"
            />
          );
        })}
      </View>
    );
  }
}

Floor.propTypes = {
  body: PropTypes.object,
};

Floor.defaultProps = {
  body: {},
};

export default Floor;
