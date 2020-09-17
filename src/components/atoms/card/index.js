import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from 'react-native';

import TitleComponent from '_atoms/title';
import SubtitleComponent from '_atoms/subtitle';
import {FONT_SIZE_10} from '_styles/typography';
import {WHITE, GRAY_LIGHT, SECONDARY} from '_styles/colors';
import {BORDER_RADIUS} from '_styles/theme';
import {FONT_SIZE_14} from '_styles';

const CardComponent = (props) => {
  const {color} = props;
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={[
          styles.containerStyle,
          props.containerStyle,
          {backgroundColor: color, borderColor: color},
        ]}>
        <Image
          source={props.source}
          style={[styles.backgroundStyle, props.backgroundImageStyle]}
          borderRadius={BORDER_RADIUS}
        />
        {/* <View style={ { borderRightWidth: 1, marginVertical: 10, marginLeft: 10, borderColor: WHITE } } /> */}
        <View style={[styles.contentStyle]}>
          <TitleComponent style={[styles.titleStyle, props.titleStyle]}>
            {props.title}
          </TitleComponent>
          {props.extraInfo}
          <SubtitleComponent
            style={[styles.subtitleStyle, props.subtitleStyle]}>
            {props.subtitle}
          </SubtitleComponent>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    padding: 0,
    margin: 0,
    borderRadius: BORDER_RADIUS,
    borderWidth: 0,
    shadowColor: WHITE,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    height: '100%',
    width: '100%',
  },
  containerStyle: {
    padding: 0,
    margin: 0,
    borderRadius: BORDER_RADIUS,
    borderColor: SECONDARY,
    borderWidth: 0,
    shadowColor: WHITE,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: SECONDARY,
    // borderWidth: 1,
  },
  titleStyle: {
    fontSize: FONT_SIZE_14,
    color: WHITE,
  },
  subtitleStyle: {
    fontSize: FONT_SIZE_10,
    color: WHITE,
  },
  backgroundStyle: {
    // position: 'absolute',

    height: 80,
    width: 80,
    // resizeMode: 'contain',
    alignSelf: 'center',
  },
  contentStyle: {
    // height: '100%',
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    // borderWidth: 1,
    borderColor: GRAY_LIGHT,
    // backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  outerTitleStyle: {
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
    width: '100%',
  },
});

export default CardComponent;
