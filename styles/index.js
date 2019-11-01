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
    position: 'absolute',
    top: 50,
    left: Specification.MAX_WIDTH / 2 - 24,
    zIndex: 10,
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
    opacity: 0.9,
    justifyContent: 'center',
    flex: 1,
  },
});

export default styles;
