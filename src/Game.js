import React, { useState, useRef, useMemo } from 'react';
import { Image, View, StatusBar, Text } from 'react-native';
import PropTypes from 'prop-types';
import { GameEngine } from 'react-native-game-engine';
import { Entypo } from '@expo/vector-icons';

import styles from '../styles';
import { setupWorld, Specification } from './constants';
import { Physics } from './systems';
import Images from './components/assets/Images';
import { Block, Text as TextB, Button } from './components';

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

  return (
    <View style={styles.container}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
      <Text style={styles.score}>{score}</Text>
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
          {win ? (
            <Text style={styles.gameOverText}>Win the Game</Text>
          ) : (
            <Block flex={0.2} row card color="white" space="between" padding={[20]} margin={[20]}>
              <Block flex={0.5} column middle>
                <TextB h3 style={{ paddingBottom: 8, paddingTop: -18 }}>
                  Congratulation
                </TextB>
                <TextB caption semibold>
                  You won the game
                </TextB>
              </Block>

              <Block flex={0.2} middle>
                <Button gradient onPress={reset}>
                  <TextB h1 center white bold>
                    <Entypo name="controller-play" size={20} />
                  </TextB>
                </Button>
              </Block>

              <Block middle flex={0.2}>
                <Button gradient onPress={() => navigation.navigate('Menu')}>
                  <TextB h1 white center bold>
                    <Entypo name="home" size={20} />
                  </TextB>
                </Button>
              </Block>
            </Block>
          )}
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
