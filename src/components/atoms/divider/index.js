import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {GRAY_LIGHT} from '_styles/colors';

const DividerComponent = (props) => {
  return <Divider style={[styles.dividerStyle, props.style]} />;
};

const styles = StyleSheet.create({
  dividerStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: GRAY_LIGHT,
  },
});

export default DividerComponent;
