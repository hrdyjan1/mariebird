/* eslint-disable global-require */
const illustration1 = require('../../assets/images/illustration_1.png');
const illustration2 = require('../../assets/images/illustration_2.png');
const illustration3 = require('../../assets/images/illustration_3.png');
const bird = require('../../assets/images/bird.png');
const bird2 = require('../../assets/images/bird2.png');
const background = require('../../assets/images/background.png');
const ceiling = require('../../assets/images/ceiling.png');
const floor2 = require('../../assets/images/water2.png');

const imageModules = [
  illustration1,
  illustration2,
  illustration3,
  bird,
  bird2,
  background,
  ceiling,
  floor2,
];

const images = {
  illustration1,
  illustration2,
  illustration3,
  bird,
  bird2,
  background,
  ceiling,
  floor2,
};

// Fonts
const Forte = require('../../assets/fonts/Forte.ttf');
const ForteBold = require('../../assets/fonts/Forte-Bold.ttf');

// Be aware of capital letters, it can cause error
const fonts = {
  Forte,
  'Forte-bold': ForteBold,
};

export { imageModules, images, fonts };
