import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';

import Block from './Block';
import Button from './Button';
import Text from './Text';

const handleText = (win, score) => {
  if (win) {
    return {
      header: 'Success',
      body: 'Congratulation, you won.',
    };
  }
  if (score === 0) {
    return {
      header: 'Failure',
      body: `You did not save all birds.`,
    };
  }
  return {
    header: 'Failure',
    body: `Only ${score} was missing to win.`,
  };
};

const Info = ({ reset, goBack, score, win }) => {
  const text = handleText(win, score);

  return (
    <Block flex={0.2} row card color="white" space="between" padding={[20]} margin={[20]}>
      <Block flex={0.5} column middle>
        <Text
          warning={!win}
          success={win}
          center
          semibold
          h3
          style={{ paddingBottom: 8, marginTop: -8 }}
        >
          {text.header}
        </Text>
        <Text center caption>
          {text.body}
        </Text>
      </Block>

      <Block flex={0.2} middle>
        <Button gradient onPress={reset}>
          <Text h1 center white bold>
            <Entypo name="controller-play" size={20} />
          </Text>
        </Button>
      </Block>

      <Block middle flex={0.2}>
        <Button gradient onPress={goBack}>
          <Text h1 white center bold>
            <Entypo name="home" size={20} />
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

Info.propTypes = {
  reset: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  win: PropTypes.bool.isRequired,
};

export default Info;
