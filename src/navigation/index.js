import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Menu from '../screens/Menu';

const screens = createSwitchNavigator(
  {
    Menu,
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
