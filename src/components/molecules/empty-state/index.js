import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import TitleComponent from '_atoms/title';
import SubtitleComponent from '_atoms/subtitle';
import {GRAY_LIGHT} from '_styles/colors';

const EmptyStateComponent = (props) => {
  return (
    <View style={styles.containerStyle}>
      <SvgXml xml={props.svg} width={props.imgWidth} height={props.imgHeight} />
      <View style={styles.infoContainer}>
        <TitleComponent h6 style={styles.emptyStateText}>
          {props.title}
        </TitleComponent>
        <SubtitleComponent h4 style={styles.emptyStateText}>
          {props.subtitle}
        </SubtitleComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GRAY_LIGHT,
    borderRadius: 0,
    padding: 20,
    aspectRatio: 1,
    // backgroundColor: WHITE,
  },

  emptyStateText: {
    textAlign: 'center',
  },
});

export default EmptyStateComponent;
