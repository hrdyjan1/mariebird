import { Dimensions } from 'react-native';

const POINTS_TO_WIN = 0;

const deviceH = Dimensions.get('screen').height;
// the value returned does not include the bottom navigation bar, I am not sure why yours does.
const windowH = Dimensions.get('window').height;
const bottomNavBarH = deviceH - windowH;

const Constants = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  MAX_WINDOW_HEIGHT: Dimensions.get('window').height,
  GAP_SIZE: 300, // gap between the two parts of the pipe
  PIPE_WIDTH: 100, // width of the pipe
  FINAL_SCORE: POINTS_TO_WIN + 1,
  INITIAL_SCORE: 10,
  BOTTOM_BAR: bottomNavBarH,
};

export default Constants;
