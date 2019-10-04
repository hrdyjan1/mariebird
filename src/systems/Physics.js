import Matter from 'matter-js';
import Specification from '../constants/Specification';

const Physics = (entities, { touches, time }) => {
  const { engine } = entities.physics;
  const bird = entities.bird.body;

  touches
    .filter(t => t.type === 'press')
    .forEach(() => {
      Matter.Body.applyForce(bird, bird.position, { x: 0.0, y: -0.1 });
    });

  for (let i = 1; i <= 4; i += 1) {
    if (entities[`pipe${i}`].body.position.x <= -1 * (Specification.PIPE_WIDTH / 2)) {
      Matter.Body.setPosition(entities[`pipe${i}`].body, {
        x: Specification.MAX_WIDTH * 2 - Specification.PIPE_WIDTH / 2,
        y: entities[`pipe${i}`].body.position.y,
      });
    } else {
      Matter.Body.translate(entities[`pipe${i}`].body, { x: -1, y: 0 });
    }
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
