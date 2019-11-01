/* eslint-disable global-require */
const images = [
  require('../../assets/images/illustration_1.png'),
  require('../../assets/images/illustration_2.png'),
  require('../../assets/images/illustration_3.png'),
];

// Be aware of capital letters, it can cause error
const fonts = {
  Forte: require('./forte.ttf'),
  'Forte-bold': require('./forte-bold.ttf'),
};

export { images, fonts };
