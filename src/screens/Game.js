import React from 'react';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { Block, Text, Button } from '../components';

const Game = () => {
  return (
    <Block flex={1} column middle color="white">
      <Block flex={0.2} row card shadow color="white" space="between" padding={[20]} margin={[20]}>
        <Block flex={0.5} column middle>
          <Text h3 style={{ paddingBottom: 8, paddingTop: -8 }}>
            Congratulation
          </Text>
          <Text caption semibold>
            You won the game
          </Text>
        </Block>

        <Block flex={0.2} middle>
          <Button gradient onPress={undefined}>
            <Text h1 center white bold>
              <Entypo name="controller-play" size={20} />
            </Text>
          </Button>
        </Block>

        <Block middle flex={0.2}>
          <Button gradient onPress={undefined}>
            <Text h1 white center bold>
              <Entypo name="home" size={20} />
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

Game.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
