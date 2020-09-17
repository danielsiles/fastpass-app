import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {
  FONT_SIZE_24,
  FONT_SIZE_22,
  FONT_SIZE_20,
  FONT_SIZE_18,
  FONT_SIZE_16,
  FONT_SIZE_14,
  FONT_SIZE_12,
} from '_styles/typography';
import {GRAY_DARK} from '_styles/colors';

const TitleComponent = (props) => {
  const h1 = props.h1 ? {fontSize: FONT_SIZE_24} : {};
  const h2 = props.h2 ? {fontSize: FONT_SIZE_22} : {};
  const h3 = props.h3 ? {fontSize: FONT_SIZE_20} : {};
  const h4 = props.h4 ? {fontSize: FONT_SIZE_18} : {};
  const h5 = props.h5 ? {fontSize: FONT_SIZE_16} : {};
  const h6 = props.h6 ? {fontSize: FONT_SIZE_14} : {};
  const h7 = props.h7 ? {fontSize: FONT_SIZE_12} : {};
  return (
    <Text style={[styles.textStyle, props.style, h1, h2, h3, h4, h5, h6, h7]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: '700',
    fontSize: FONT_SIZE_24,
    color: GRAY_DARK,
  },
});

export default TitleComponent;
