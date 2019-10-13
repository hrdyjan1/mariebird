import React from 'react';
import decomp from 'poly-decomp';
import Game from './src/Game';

global['poly-decomp'] = decomp;
global.decomp = decomp;

export default function App() {
  return <Game />;
}
