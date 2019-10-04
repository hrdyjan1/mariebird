import React, { useState, useRef, useMemo } from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import styles from '../styles';
import { setupWorld } from './constants';
import { Physics } from './systems';

function Game() {
  const [running, setRunning] = useState(true);
  const gameEngine = useRef();
  const entities = useMemo(() => setupWorld(gameEngine), []);

  const onEvent = e => {
    if (e.type === 'game-over') {
      setRunning(false);
    }
  };

  const reset = () => {
    gameEngine.current.swap(setupWorld(gameEngine));
    setRunning(true);
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.gameOverText}>Game Over</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Game;

// import React, { Component } from 'react';
// import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
// import Matter from 'matter-js';
// import { GameEngine } from 'react-native-game-engine';
// import Bird from './components/Bird';
// import Wall from './components/Wall';
// import Physics from './systems/Physics';

// import Constants from './constants/Constants';

// export const randomBetween = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// export const generatePipes = () => {
//   const topPipeHeight = randomBetween(100, Constants.MAX_HEIGHT / 2 - 100);
//   const bottomPipeHeight = Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;

//   let sizes = [topPipeHeight, bottomPipeHeight];

//   if (Math.random() < 0.5) {
//     sizes = sizes.reverse();
//   }

//   return sizes;
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gameContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   gameOverText: {
//     color: 'white',
//     fontSize: 48,
//   },
//   fullScreen: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'black',
//     opacity: 0.8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullScreenButton: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flex: 1,
//   },
// });

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       running: true,
//     };

//     this.gameEngine = null;

//     this.entities = this.setupWorld();
//   }

//   setupWorld = () => {
//     const engine = Matter.Engine.create({ enableSleeping: false });
//     const { world } = engine;
//     world.gravity.y = 1.2;

//     const bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 50, 50);
//     bird.restitution = 20;
//     const floor = Matter.Bodies.rectangle(
//       Constants.MAX_WIDTH / 2,
//       Constants.MAX_HEIGHT - 25,
//       Constants.MAX_WIDTH,
//       50,
//       { isStatic: true }
//     );
//     const ceiling = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, 25, Constants.MAX_WIDTH, 50, {
//       isStatic: true,
//     });

//     const [pipe1Height, pipe2Height] = generatePipes();

//     const pipe1 = Matter.Bodies.rectangle(
//       Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
//       pipe1Height / 2,
//       Constants.PIPE_WIDTH,
//       pipe1Height,
//       { isStatic: true }
//     );
//     const pipe2 = Matter.Bodies.rectangle(
//       Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
//       Constants.MAX_HEIGHT - pipe2Height / 2,
//       Constants.PIPE_WIDTH,
//       pipe2Height,
//       { isStatic: true }
//     );

//     const [pipe3Height, pipe4Height] = generatePipes();

//     const pipe3 = Matter.Bodies.rectangle(
//       Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
//       pipe3Height / 2,
//       Constants.PIPE_WIDTH,
//       pipe3Height,
//       { isStatic: true }
//     );
//     const pipe4 = Matter.Bodies.rectangle(
//       Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
//       Constants.MAX_HEIGHT - pipe4Height / 2,
//       Constants.PIPE_WIDTH,
//       pipe4Height,
//       { isStatic: true }
//     );

//     Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);
//     Matter.Events.on(engine, 'collisionStart', () => {
//       this.gameEngine.dispatch({ type: 'game-over' });
//     });

//     return {
//       physics: { engine, world },
//       floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall },
//       ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall },
//       bird: { body: bird, size: [50, 50], color: 'red', renderer: Bird },
//       pipe1: {
//         body: pipe1,
//         size: [Constants.PIPE_WIDTH, pipe1Height],
//         color: 'green',
//         renderer: Wall,
//       },
//       pipe2: {
//         body: pipe2,
//         size: [Constants.PIPE_WIDTH, pipe2Height],
//         color: 'green',
//         renderer: Wall,
//       },
//       pipe3: {
//         body: pipe3,
//         size: [Constants.PIPE_WIDTH, pipe3Height],
//         color: 'green',
//         renderer: Wall,
//       },
//       pipe4: {
//         body: pipe4,
//         size: [Constants.PIPE_WIDTH, pipe4Height],
//         color: 'green',
//         renderer: Wall,
//       },
//     };
//   };

//   onEvent = e => {
//     if (e.type === 'game-over') {
//       // Alert.alert("Game Over");
//       this.setState({
//         running: false,
//       });
//     }
//   };

//   reset = () => {
//     this.gameEngine.swap(this.setupWorld());
//     this.setState({
//       running: true,
//     });
//   };

//   render() {
//     const { running } = this.state;
//     return (
//       <View style={styles.container}>
//         <GameEngine
//           ref={ref => {
//             this.gameEngine = ref;
//           }}
//           style={styles.gameContainer}
//           systems={[Physics]}
//           running={running}
//           onEvent={this.onEvent}
//           entities={this.entities}
//         >
//           <StatusBar hidden />
//         </GameEngine>
//         {!running && (
//           <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
//             <View style={styles.fullScreen}>
//               <Text style={styles.gameOverText}>Game Over</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   }
// }
