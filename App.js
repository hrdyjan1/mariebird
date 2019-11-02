/* eslint-disable global-require */
import React, { useState } from 'react';
import decomp from 'poly-decomp';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import Navigation from './src/navigation';
import { imageModules as images, fonts } from './src/constants';
import Block from './src/components/Block';

// To be able to handle concave angles in Game object detection
global['poly-decomp'] = decomp;
global.decomp = decomp;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  async function handleResources() {
    return Promise.all([Asset.loadAsync(images), Font.loadAsync(fonts)]);
  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  function startApp() {
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <AppLoading
        startAsync={handleResources}
        onError={e => handleLoadingError(e)}
        onFinish={startApp}
      />
    );
  }

  return (
    <Block white>
      <Navigation />
    </Block>
  );
}
