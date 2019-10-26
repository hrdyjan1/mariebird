import React from 'react';
import { Modal, View } from 'react-native';
import PropTypes from 'prop-types';

import { sizes } from '../constants';
import { Block, Button, Text } from '../components';

const Tutorial = ({ isVisible, close }) => {
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={close}>
      <Block padding={[sizes.padding * 2, sizes.padding]} space="between">
        <Text h2 light>
          Information
        </Text>

        <View style={{ marginVertical: sizes.padding }}>
          <Text h3 light style={{ marginTop: sizes.base, marginBottom: sizes.base / 2 }}>
            How to play
          </Text>
          <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
            1. First rule is, the bird flies alone. Just calm down and prepare yourself for playing.
          </Text>
          <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
            2. Feel free to start tapping the screen to handle your bird flying. Every single tap
            means the bird will take off a little.
          </Text>
          <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
            3. Main goal of the game is to fly through 10 ice mountains and reach the other bird
            carrying heavy nest. This way you will that help him to safe eggs from crashing down.
          </Text>

          <Text h3 light style={{ marginTop: sizes.base, marginBottom: sizes.base / 2 }}>
            Bonus
          </Text>
          <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
            1. Accomplishment of the game is teach other players to be patience.
          </Text>
          <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
            2. Originally the game is a gift for my girlfriend Marie. Love you.
          </Text>
          <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
            3. This game is based on themes of Flappy bird.
          </Text>
          <Text caption gray height={24} style={{ marginBottom: sizes.base }}>
            4. Feel free to contact the founder of the game about your reminders and notes.
          </Text>
        </View>

        <Block flex={0.2} padding={[sizes.base * 1.5, 0]}>
          <Button gradient onPress={close}>
            <Text center white>
              Got it
            </Text>
          </Button>
        </Block>
      </Block>
    </Modal>
  );
};

Tutorial.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Tutorial;
