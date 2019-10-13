/* eslint-disable no-restricted-properties */
/* eslint-disable import/prefer-default-export */
import Matter from 'matter-js';
import Specification from './Specification';

import { Floor, Bird, Ceiling } from '../components';

const height = ({ body: { bounds } }) => bounds.max.y - bounds.min.y;
const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatePipes = () => {
  const topPipeHeight = randomBetween(100, Specification.MAX_HEIGHT / 2 - 100);
  const bottomPipeHeight = Specification.MAX_HEIGHT - topPipeHeight - Specification.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

const base = ({ body }) => ({
  x: body.position.x,
  y: body.position.y + height({ body }) / 2,
});

function setupWorld(gameEngine) {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  world.gravity.y = 0.0;

  const bird = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH / 4,
    Specification.MAX_HEIGHT / 2,
    50,
    50
  );

  // Ceiling - triangle
  //   const vertices = [{ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }];
  //   const triangleVertices = Matter.Vertices.create(vertices);
  //   const triangle = Matter.Bodies.fromVertices(Specification.MAX_WIDTH / 2, 300, triangleVertices);

  const floor = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH / 2,
    Specification.MAX_WINDOW_HEIGHT - 50,
    Specification.MAX_WIDTH,
    100,
    { isStatic: true }
  );

  const ceiling = Matter.Bodies.rectangle(
    Specification.MAX_WIDTH / 2,
    75,
    Specification.MAX_WIDTH,
    150,
    {
      isStatic: true,
    }
  );

  Matter.World.add(world, [bird, floor, ceiling]);
  Matter.Events.on(engine, 'collisionStart', () => {
    gameEngine.current.dispatch({ type: 'game-over' });
  });

  return {
    physics: { engine, world },
    bird: {
      body: bird,
      size: [50, 50],
      renderer: Bird,
      score: Specification.INITIAL_SCORE,
      color: 'yellow',
    },
    ceiling: {
      body: ceiling,
      renderer: Ceiling,
    },
    floor: { body: floor, renderer: Floor },
  };
}

export { setupWorld, base, distance, generatePipes, randomBetween };
