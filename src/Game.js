import React, { useState, useRef, useMemo } from 'react';
import { Image, View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import styles from '../styles';
import { setupWorld, Specification } from './constants';
import { Physics } from './systems';
import Images from './components/assets/Images';

function Game() {
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
        <TouchableOpacity style={styles.fullScreenButton} onPress={reset}>
          <View style={styles.fullScreen}>
            {win ? (
              <Text style={styles.gameOverText}>Win the Game</Text>
            ) : (
              <Text style={styles.gameOverText}>Game Over</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Game;
