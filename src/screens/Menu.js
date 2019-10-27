/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState } from 'react';
import { Animated, Dimensions, Image, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Block, Button, Text } from '../components';
import { sizes } from '../constants';
import Tutorial from './Tutorial';

const { width, height } = Dimensions.get('screen');
const scrollX = new Animated.Value(0);

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});

export default function Menu({ navigation, illustrations }) {
  const [isTutorialVisible, setTutorialVisible] = useState(false);

  function renderIllustrations() {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: scrollX } },
          },
        ])}
      />
    );
  }

  function renderSteps() {
    const stepPosition = Animated.divide(scrollX, width);

    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((__, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="primary"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  function handleStart() {
    navigation.navigate('Game');
  }

  function openTutorial() {
    setTutorialVisible(true);
  }

  function closeTutorial() {
    setTutorialVisible(false);
  }

  return (
    <Block>
      <Block center bottom flex={0.35}>
        <Text h1 center bold>
          Marie{' '}
          <Text h1 primary>
            Bird
          </Text>
        </Text>
        <Text h3 gray2 style={{ marginTop: sizes.padding / 2 }}>
          Enjoy the Game and have a fun.
        </Text>
      </Block>
      <Block center middle>
        {renderIllustrations()}
        {renderSteps()}
      </Block>
      <Block top flex={0.3} margin={[0, sizes.padding * 2]}>
        <Button gradient onPress={handleStart}>
          <Text center semibold white>
            Start
          </Text>
        </Button>
        <Button shadow onPress={openTutorial} style->
          <Text center semibold>
            Information
          </Text>
        </Button>
      </Block>
      <Tutorial isVisible={isTutorialVisible} close={closeTutorial} />
    </Block>
  );
}

Menu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  illustrations: PropTypes.arrayOf(PropTypes.object),
};

Menu.defaultProps = {
  illustrations: [
    { id: 1, source: require('../../assets/images/illustration_1.png') },
    { id: 2, source: require('../../assets/images/illustration_2.png') },
    { id: 3, source: require('../../assets/images/illustration_3.png') },
  ],
};
