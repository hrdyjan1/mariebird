import React, { useState } from 'react';
import PropTypes from 'prop-types';
import decomp from 'poly-decomp';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import Navigation from './src/navigation';
import { images } from './src/constants';
import Block from './src/components/Block';

// To be able to handle concave angles in Game object detection
global['poly-decomp'] = decomp;
global.decomp = decomp;

export default function App({ skipLoadingScreen }) {
  const [isLoading, setIsLoading] = useState(true);

  async function handleResources() {
    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
    return Promise.all(cacheImages);
  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  function startApp() {
    setIsLoading(false);
  }

  if (isLoading && !skipLoadingScreen) {
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

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};

App.defaultProps = {
  skipLoadingScreen: false,
};
