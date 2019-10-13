import { StyleSheet } from 'react-native';
import Specification from '../src/constants/Specification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Specification.MAX_WIDTH,
    height: Specification.MAX_HEIGHT,
  },
  score: {
    color: 'white',
    fontSize: 72,
    position: 'absolute',
    top: 50,
    left: Specification.MAX_WIDTH / 2 - 24,
    textShadowColor: '#222222',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
});

export default styles;
