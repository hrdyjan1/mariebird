/* eslint-disable global-require */
import React from 'react';
import SpriteSheet from 'rn-sprite-sheet';

function Mummy() {
  const mummy = React.createRef();
  function play(type) {
    mummy.current.play({
      type,
      fps: Number(18),
      loop: true,
      resetAfterFinish: true,
    });
  }

  return (
    <SpriteSheet
      ref={ref => {
        mummy.current = ref;
      }}
      source={require('./bird4s.png')}
      columns={4}
      rows={1}
      height={51} // set either, none, but not both
      // width={200}
      animations={{
        walk: [0, 1, 2, 3],
      }}
      onLoad={() => play('walk')}
    />
  );
}

export default React.memo(Mummy);
