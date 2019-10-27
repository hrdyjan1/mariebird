import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Menu } from '../screens';
import Game from '../Game';

const screens = createSwitchNavigator(
  {
    Menu,
    Game,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {},
      headerBackImage: <Image />,
      headerBackTitle: null,
      headerLeftContainerStyle: {},
      headerRightContainerStyle: {},
    },
  }
);

export default createAppContainer(screens);
