import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Menu, Game } from '../screens';

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
