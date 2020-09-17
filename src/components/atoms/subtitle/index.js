import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {
  FONT_SIZE_18,
  FONT_SIZE_16,
  FONT_SIZE_14,
  FONT_SIZE_12,
  FONT_SIZE_10,
} from '_styles/typography';
import {GRAY_DARK} from '_styles/colors';

const SubtitleComponent = (props) => {
  const h1 = props.h1 ? {fontSize: FONT_SIZE_18} : {};
  const h2 = props.h2 ? {fontSize: FONT_SIZE_16} : {};
  const h3 = props.h3 ? {fontSize: FONT_SIZE_14} : {};
  const h4 = props.h4 ? {fontSize: FONT_SIZE_12} : {};
  const h5 = props.h5 ? {fontSize: FONT_SIZE_10} : {};
  return (
    <Text style={[styles.textStyle, props.style, h1, h2, h3, h4, h5]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: '300',
    fontSize: FONT_SIZE_12,
    color: GRAY_DARK,
    flexWrap: 'wrap',
  },
});

export default SubtitleComponent;
