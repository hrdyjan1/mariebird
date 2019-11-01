import React, { useState, useRef, useMemo } from 'react';
import { Image, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { GameEngine } from 'react-native-game-engine';

import styles from '../styles';
import { setupWorld, Specification } from './constants';
import { Physics } from './systems';
import Images from './components/assets/Images';
import { Info, Text } from './components';

function Game({ navigation }) {
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(Specification.INITIAL_SCORE);
  const [win, setWin] = useState(false);
  const gameEngine = useRef();
  const entities = useMemo(() => setupWorld(gameEngine), []);

  const onEvent = e => {
    if (e.type === 'game-over') {
      setRunning(false);
    } else if (e.type === 'score') {
      setScore(s => s - 1);
    } else if (e.type === 'game-win') {
      setWin(true);
    }
  };

  const reset = () => {
    gameEngine.current.swap(setupWorld(gameEngine));
    setWin(false);
    setScore(Specification.INITIAL_SCORE);
    setRunning(true);
  };

  const goBack = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
      <Text score bold black style={styles.score}>
        {score}
      </Text>
      <GameEngine
        ref={ref => {
          gameEngine.current = ref;
        }}
        style={styles.gameContainer}
        systems={[Physics]}
        running={running}
        onEvent={onEvent}
        entities={entities}
      >
        <StatusBar hidden />
      </GameEngine>
      {!running && (
        <View style={styles.fullScreen}>
          <Info goBack={goBack} reset={reset} score={score} win={win} />
        </View>
      )}
    </View>
  );
}

Game.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default Game;
