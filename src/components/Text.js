/* eslint-disable react/jsx-props-no-spreading */
// just copy this code from the driving repo :)
import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { sizes, colors, texts } from '../constants/Theme';

const styles = StyleSheet.create({
  // default style
  text: {
    fontFamily: 'Forte',
    fontSize: sizes.font,
    color: colors.black,
  },
  // variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'Forte-bold',
  },
  semibold: {
    fontFamily: 'Forte-bold',
  },
  medium: {
    fontFamily: 'Forte-bold',
  },
  light: {
    fontFamily: 'Forte',
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  accent: { color: colors.accent },
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  tertiary: { color: colors.tertiary },
  warning: { color: colors.warning },
  success: { color: colors.success },
  black: { color: colors.black },
  white: { color: colors.white },
  gray: { color: colors.gray },
  gray2: { color: colors.gray2 },
  // fonts
  h1: texts.h1,
  h2: texts.h2,
  h3: texts.h3,
  title: texts.title,
  score: texts.score,
  body: texts.body,
  caption: texts.caption,
  small: texts.small,
});

const Typography = complexProps => {
  const {
    h1,
    h2,
    h3,
    title,
    score,
    body,
    caption,
    small,
    size,
    transform,
    align,
    // styling
    regular,
    bold,
    semibold,
    medium,
    weight,
    light,
    center,
    right,
    spacing, // letter-spacing
    height, // line-height
    // colors
    color,
    accent,
    primary,
    secondary,
    tertiary,
    warning,
    success,
    black,
    white,
    gray,
    gray2,
    style,
    children,
    ...props
  } = complexProps;

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    title && styles.title,
    score && styles.score,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    size && { fontSize: size },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    medium && styles.medium,
    light && styles.light,
    center && styles.center,
    right && styles.right,
    color && styles[color],
    color && !styles[color] && { color },
    // color shortcuts
    accent && styles.accent,
    primary && styles.primary,
    secondary && styles.secondary,
    tertiary && styles.tertiary,
    warning && styles.warning,
    success && styles.success,
    black && styles.black,
    white && styles.white,
    gray && styles.gray,
    gray2 && styles.gray2,
    style, // rewrite predefined styles
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

export default Typography;
