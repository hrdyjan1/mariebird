/* eslint-disable no-param-reassign */
import Matter from 'matter-js';
import Specification from '../constants/Specification';
import { Wall, Bird } from '../components';
import { generatePipes, distance, base } from '../constants';

export function addFinalBird(x, world, entities) {
  const bird2 = Matter.Bodies.rectangle(
    x + Specification.PIPE_WIDTH * 2,
    Specification.MAX_HEIGHT / 4,
    50,
    50,
    {
      isStatic: true,
    }
  );

  Matter.World.add(world, [bird2]);

  entities.bird2 = {
    body: bird2,
    size: [50, 50],
    color: 'blue',
    renderer: Bird,
  };
}

let pipeNumber = 1;

function addPipes(x, world, entities) {
  const [pipe1Height, pipe2Height] = generatePipes();

  const pipe1 = Matter.Bodies.rectangle(
    x + Specification.PIPE_WIDTH,
    pipe1Height / 2,
    Specification.PIPE_WIDTH,
    pipe1Height,
    {
      isStatic: true,
    }
  );

  const pipe2 = Matter.Bodies.rectangle(
    x + Specification.PIPE_WIDTH,
    Specification.MAX_HEIGHT - 50 - pipe2Height / 2,
    Specification.PIPE_WIDTH,
    pipe2Height,
    { isStatic: true }
  );

  Matter.World.add(world, [pipe1, pipe2]);

  entities[`pipe${pipeNumber}`] = {
    body: pipe1,
    size: [Specification.PIPE_WIDTH, pipe1Height],
    color: 'red',
    renderer: Wall,
    scored: false,
  };

  entities[`pipe${pipeNumber + 1}`] = {
    body: pipe2,
    size: [Specification.PIPE_WIDTH, pipe2Height],
    color: 'green',
    renderer: Wall,
    scored: false,
  };

  pipeNumber += 2;
}

// Game ecosystem
const Physics = (entities, { touches, time, dispatch }) => {
  const { engine } = entities.physics;
  const bird = entities.bird.body;
  const { bird2 } = entities;
  const { world } = entities.physics;

  // Moving the pipes
  let hadTouches = false;
  touches
    .filter(t => t.type === 'press')
    .forEach(() => {
      if (!hadTouches) {
        if (world.gravity.y === 0.0) {
          addPipes(Specification.MAX_WIDTH, world, entities);
          addPipes(Specification.MAX_WIDTH * 2, world, entities);
          world.gravity.y = 1.2;
        }

        hadTouches = true;
        Matter.Body.setVelocity(bird, {
          x: bird.velocity.x,
          y: -10,
        });
      }
    });

  // If added final bird set distances
  if (bird2) {
    const birdBase = base(entities.bird);
    const bird2Base = base(entities.bird2);
    if (distance(birdBase, bird2Base) < 100) dispatch({ type: 'game-win' });
  }

  // Handle game moving
  Object.keys(entities).forEach(key => {
    const isNotDeleted = Object.prototype.hasOwnProperty.call(entities, key);
    if (key.indexOf('pipe') === 0 && isNotDeleted) {
      Matter.Body.translate(entities[key].body, { x: -2, y: 0 });

      // Choose bottom pipe to detect score
      if (parseInt(key.replace('pipe', ''), 10) % 2 === 0) {
        // Behind pipe => score
        if (
          entities[key].body.position.x + Specification.PIPE_WIDTH / 2 <= bird.position.x &&
          !entities[key].scored
        ) {
          entities[key].scored = true;

          entities.bird.score -= 1;
          dispatch({ type: 'score' });

          // Behind last pipe
          if (entities.bird.score === Specification.FINAL_SCORE && !bird2) {
            addFinalBird(Specification.MAX_WIDTH * 2 - Specification.PIPE_WIDTH, world, entities);
          }
        }

        // Not visible pipe delete
        if (entities[key].body.position.x <= -1 * (Specification.PIPE_WIDTH / 2)) {
          const pipeIndex = parseInt(key.replace('pipe', ''), 10);

          delete entities[`pipe${pipeIndex - 1}`];
          delete entities[`pipe${pipeIndex}`];

          if (entities.bird.score > Specification.FINAL_SCORE) {
            addPipes(Specification.MAX_WIDTH * 2 - Specification.PIPE_WIDTH, world, entities);
          }
        }
      }
      // Move final bird down
    } else if (key.indexOf('bird2') === 0) {
      Matter.Body.translate(entities[key].body, { x: -2, y: 0.5 });
    }
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
