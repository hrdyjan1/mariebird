/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, sizes } from '../constants/Theme';

const styles = StyleSheet.create({
  button: {
    borderRadius: sizes.radius,
    height: sizes.base * 3,
    justifyContent: 'center',
    marginVertical: sizes.padding / 3,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: { backgroundColor: colors.accent },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  tertiary: { backgroundColor: colors.tertiary },
  black: { backgroundColor: colors.black },
  white: { backgroundColor: colors.white },
  gray: { backgroundColor: colors.gray },
  gray2: { backgroundColor: colors.gray2 },
  gray3: { backgroundColor: colors.gray3 },
  gray4: { backgroundColor: colors.gray4 },
});

const Button = complexProps => {
  const {
    style,
    opacity,
    gradient,
    color,
    startColor,
    endColor,
    end,
    start,
    locations,
    shadow,
    children,
    ...props
  } = complexProps;

  const buttonStyles = [
    styles.button,
    shadow && styles.shadow,
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style,
  ];

  if (gradient) {
    return (
      <TouchableOpacity style={buttonStyles} activeOpacity={opacity} {...props}>
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          style={buttonStyles}
          colors={[startColor, endColor]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={buttonStyles} activeOpacity={opacity || 0.8} {...props}>
      {children}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  startColor: colors.primary,
  endColor: colors.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: colors.white,
};

export default Button;
