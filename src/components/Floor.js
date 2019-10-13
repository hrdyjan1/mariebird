/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-spread */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import Images from './assets/Images';

export default class Floor extends PureComponent {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const imageIterations = Math.ceil(width / height);
    const specEmptyLengthArray = Array(imageIterations).fill(null);

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
        {specEmptyLengthArray.map((__, idx) => {
          return (
            <Image
              style={{ width: height, height }}
              key={idx}
              resizeMode="stretch"
              //   source={idx % 2 === 0 ? Images.floor1 : Images.floor2}
              source={Images.floor2}
            />
          );
        })}
      </View>
    );
  }
}
