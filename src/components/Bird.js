/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import Images from './assets/Images';

function Bird({ size, body }) {
  const width = size[0];
  const height = size[1];
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
      source={Images.bird}
    />
  );
}

Bird.propTypes = {
  size: PropTypes.array,
  body: PropTypes.object,
};

Bird.defaultProps = {
  size: [],
  body: {},
};

export default Bird;

// function Bird({ size, body }) {
//   const width = size[0];
//   const height = size[1];
//   const x = body.position.x - width / 2;
//   const y = body.position.y - height / 2;

//   return (
//     <View
//       style={{
//         position: 'absolute',
//         left: x,
//         top: y,
//         width,
//         height,
//       }}
//     >
//       <Mummy />
//     </View>
//   );
// }
