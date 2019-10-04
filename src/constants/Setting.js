/* eslint-disable import/prefer-default-export */
import Matter from 'matter-js';
import Specification from './Specification';

import { Bird, Wall } from '../components';

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generatePipes = () => {
  const topPipeHeight = randomBetween(100, Specification.MAX_HEIGHT / 2 - 100);
  const bottomPipeHeight = Specification.MAX_HEIGHT - topPipeHeight - Specification.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

function setupWorld(gameEngine) {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;

  const bird = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH / 4,
    Specification.MAX_HEIGHT / 2,
    50,
    50
  );
  const floor = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH / 2,
    Specification.MAX_HEIGHT - 25,
    Specification.MAX_WIDTH,
    200,
    { isStatic: true }
  );
  const ceiling = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH / 2,
    25,
    Specification.MAX_WIDTH,
    50,
    {
      isStatic: true,
    }
  );
  const [pipe1Height, pipe2Height] = generatePipes();

  const pipe1 = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH - Specification.PIPE_WIDTH / 2,
    pipe1Height / 2,
    Specification.PIPE_WIDTH,
    pipe1Height,
    { isStatic: true }
  );
  const pipe2 = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH - Specification.PIPE_WIDTH / 2,
    Specification.MAX_HEIGHT - pipe2Height / 2,
    Specification.PIPE_WIDTH,
    pipe2Height,
    { isStatic: true }
  );

  const [pipe3Height, pipe4Height] = generatePipes();

  const pipe3 = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH * 2 - Specification.PIPE_WIDTH / 2,
    pipe3Height / 2,
    Specification.PIPE_WIDTH,
    pipe3Height,
    { isStatic: true }
  );
  const pipe4 = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH * 2 - Specification.PIPE_WIDTH / 2,
    Specification.MAX_HEIGHT - pipe4Height / 2,
    Specification.PIPE_WIDTH,
    pipe4Height,
    { isStatic: true }
  );

  Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);
  Matter.Events.on(engine, 'collisionStart', () => {
    gameEngine.current.dispatch({ type: 'game-over' });
  });

  return {
    physics: { engine, world },
    bird: { body: bird, size: [50, 50], color: 'red', renderer: Bird },
    ceiling: { body: ceiling, size: [Specification.MAX_WIDTH, 50], color: 'green', renderer: Wall },
    floor: { body: floor, size: [Specification.MAX_WIDTH, 200], color: 'green', renderer: Wall },
    pipe1: {
      body: pipe1,
      size: [Specification.PIPE_WIDTH, pipe1Height],
      color: 'green',
      renderer: Wall,
    },
    pipe2: {
      body: pipe2,
      size: [Specification.PIPE_WIDTH, pipe2Height],
      color: 'green',
      renderer: Wall,
    },
    pipe3: {
      body: pipe3,
      size: [Specification.PIPE_WIDTH, pipe3Height],
      color: 'green',
      renderer: Wall,
    },
    pipe4: {
      body: pipe4,
      size: [Specification.PIPE_WIDTH, pipe4Height],
      color: 'green',
      renderer: Wall,
    },
  };
}

export { setupWorld };
