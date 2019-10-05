/* eslint-disable global-require */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import Images from '../../assets/images';

class Bird extends PureComponent {
  render() {
    const { body } = this.props;
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
      <Image
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
        }}
        resizeMode="stretch"
        source={Images.bird1}
      />
    );
  }
}

Bird.propTypes = {
  body: PropTypes.object,
};

Bird.defaultProps = {
  body: {},
};

export default Bird;
